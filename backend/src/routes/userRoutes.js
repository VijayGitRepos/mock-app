import express from 'express';
import { getUsers } from '../controllers/userController.js';
import {verifyToken} from '../middlewares/authMiddleware.js'

const router = express.Router();
router.get('/',getUsers);
router.get('/admin',verifyToken, (req,res)=>{
    res.json({message:'Welcome Admin'})
})
router.get('/manager',(req,res)=>{
    res.json({message:'Welcome Manager'})
})
router.get('/user',(req,res)=>{
    res.json({message:'Welcome User'})
})


export default router