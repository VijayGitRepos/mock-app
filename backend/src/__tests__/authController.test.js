import { registerController, loginController } from "../controllers/authController.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

jest.mock("../models/user.model.js");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");

describe("Auth Controllers Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    process.env.JWT_SECRET = "testsecret";
    jest.clearAllMocks();

    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("registerController", () => {
    it("should return message if user already exists", async () => {
      req.body = { email: "existing@test.com", password: "password123" };
      User.findOne.mockResolvedValue({ email: "existing@test.com" }); 

      await registerController(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: "existing@test.com" });
      expect(res.json).toHaveBeenCalledWith({ message: "User already exist" });
    });

    it("should register a new user successfully", async () => {
      req.body = { name: "Vijay", email: "new@test.com", password: "password123", role: "user" };
      User.findOne.mockResolvedValue(null); // No user found
      bcrypt.hash.mockResolvedValue("hashedPassword123");
      jwt.sign.mockReturnValue("mockedJwtToken");

      const saveMock = jest.fn().mockResolvedValue(true);
      User.mockImplementation(() => ({
        save: saveMock,
      }));

      await registerController(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
      expect(saveMock).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: "new@test.com", role: "user" },
        "testsecret",
        { expiresIn: "1h" }
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Registration success" });
    });

    it("should handle registration errors gracefully", async () => {
      req.body = { email: "error@test.com" };
      User.findOne.mockRejectedValue(new Error("Database connection dropped"));

      await registerController(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: "User registration failed" });
    });
  });

  describe("loginController", () => {
    it("should return 400 if user does not exist", async () => {
      req.body = { email: "notfound@test.com", password: "password123" };
      User.findOne.mockResolvedValue(null);

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Login User does not exist. Please register",
      });
    });

    it("should return 400 if credentials do not match", async () => {
      req.body = { email: "user@test.com", password: "wrongpassword" };
      const mockUser = { email: "user@test.com", password: "hashedPassword" };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false); 

      await loginController(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", "hashedPassword");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Login Invalid creds" });
    });

    it("should login successfully and return a token", async () => {
      req.body = { email: "user@test.com", password: "correctpassword" };
      const mockUser = { email: "user@test.com", password: "hashedPassword", role: "admin" };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true); 
      jwt.sign.mockReturnValue("validToken123");

      await loginController(req, res);

      expect(jwt.sign).toHaveBeenCalledWith(
        { email: "user@test.com", role: "admin" },
        "testsecret",
        { expiresIn: "1h" }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "login success",
        token: "validToken123",
      });
    });

    it("should return 500 if a server error occurs", async () => {
      req.body = { email: "crash@test.com" };
      User.findOne.mockRejectedValue(new Error("Fatal exception"));

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Login Server error" });
    });
  });
});
