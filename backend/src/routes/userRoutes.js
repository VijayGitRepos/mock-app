import express from 'express';
import { deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';
import {verifyToken} from '../middlewares/authMiddleware.js'

const router = express.Router();
router.get('/',getUsers);
router.get('/admin',verifyToken, (req,res)=>{
    res.json({message:'Welcome Admin'})
})
router.get('/manager',verifyToken,(req,res)=>{
    res.json({message:'Welcome Manager'})
})
router.get('/user-access',verifyToken,(req,res)=>{
    res.json({message:'Welcome User'})
})
router.get('/:id',getUserById)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)


export default router