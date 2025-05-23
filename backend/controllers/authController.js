const User=require('../models/User')
const jwt=require('jsonwebtoken')


//Generate JWT token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1h"});
}


//Register user
const registerUser=async(req,res)=>{
    const {fullName,email,password,profileImageUrl}= req.body;
    //Validation check for missing fields
    if(!fullName || !email || !password){
        return res.status(400).json({message:"Please fill in all fields"})
    }

    try{
        //Check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }

        //create the user
        const user=await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        })

        res.status(201).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        })
    } catch(err){
        res.status(500).json({message:"Error creating user",error:err.message})
    }
}

//Login user
const loginUser=async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"All Fields are required"});
    }

    try {
        const user=await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({message:"Error logging in user",error:error.message})
    }
}


//get user
const getUserInfo=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:"Error getting user info",error:error.message})
    }
}

module.exports={
    registerUser,
    loginUser,
    getUserInfo
}