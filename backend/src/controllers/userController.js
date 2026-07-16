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

export const getUserById = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        return res.status(200).json({message:'User fetch success', data:user})
    }catch(err){
        console.log('Error Getting single user');
        return res.status(400).json({message:'Error getting single user'})
    }
}

export const updateUser = async (req,res)=>{
    try{
        const{id} = req.params;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(id,updateData,{new:true,runValidators:true});
        if(!updatedUser){
            return res.status(404).json({message:'User not found'})
        }
        return res.status(200).json({message:'User updated successfully',updatedUser})
    }catch(error){
        console.log('Update error', error)
        return res.status(500).json({message:'error updating user'})
    }
}

export const deleteUser = async(req,res)=>{
    try{
        const{id}=req.params;
        console.log(req.params);
        const user=await User.findByIdAndDelete(id)
        return res.status(200).json({message:'User deleted successfully'})
    }catch(err){
        console.log('Delete user Error',err)
        return res.status(500).json({message:'Error deleting user'})
    }
}