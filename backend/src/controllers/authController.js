import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

export const registerController=async (req,res)=>{
    try {
        const{name,password,email,role}=req.body;
        // console.log('User Inputs', name, password,email,role)
        const user = await User.findOne({email})
        const jwt_key = process.env.JWT_SECRET;

        if(user){
            return res.json({message:'User already exist'})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser=new User({name,password:hashedPassword,email,role});
        await newUser.save();
        const payload = {email,role};
        const token=jwt.sign(payload,jwt_key,{expiresIn:'1h'})
        console.log(token)
        return res.status(201).json({message:'Registration success'})
    } catch (error) {
        return res.json({message:'User registration failed'})
    }
}

export const loginController=async (req,res)=>{
    try{
        const{email,password}=req.body;
        // console.log('Login Creds', email,password)
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Login User does not exist. Please register'})
        }
        // console.log('User Password',user.password)
        const isMatch = await bcrypt.compare(password,user.password);
        // console.log('isMatch',isMatch)
        if(!isMatch){
            return res.status(400).json({message:'Login Invalid creds'} )
        }
        const jwt_key = process.env.JWT_SECRET;
        const payload = {email:user.email,role:user.role};
        const token = jwt.sign(payload,jwt_key,{expiresIn:'1h'})
        return res.status(200).json({message:'login success',token})
    }catch(error){
        return res.status(500).json({message:'Login Server error'})
    }
}