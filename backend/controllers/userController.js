const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookie= require("cookie-parser");


// sign up ka handler

export const signup= async(req,res)=>{
    try{

        const {userName, email, password}=req.body;

        if(!userName || !email || !password ){
            return res.status(402).json({
                success: false,
                message: "All fields are required.",
            })
        }

        const user=await User.find({email});
        if(user){
            return res.signup(401).json({
                success: false,
                message: "User already exists.",
            })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                sucess: false,
                message: "Error in hasing password",
            });
        }

        const newUser=await User.create({userName,email , password});   
        return res.status(200).json({
            success: true,
            message: "User signup successfully.",
        })     
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Error in sign up.",
            newUser,
        })
    }
}

// login ka handler

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(402).json({
                success: false,
                message: "All fields are required.",
            })
        }

        const user=await User.find({email});

        if(!user){
            return res.signup(401).json({
                success: false,
                message: "User does not exists.",
            })
        }

        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Error in login.",
        })
    }
}