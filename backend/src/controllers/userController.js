import User from "../models/user.model.js";

export const getUsers = async (req,res)=>{
    try{
        const users = await User.find({});
        res.status(200).json({message:'User fetched successfully',data:users})
    }catch(err){
        console.log('Error fetching users',err)
        res.status(500).json({message:'Error fetching users'})
    }
}