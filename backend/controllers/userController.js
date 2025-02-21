const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookie= require("cookie-parser");
const { response } = require("express");
require("dotenv").config();

// sign up ka handler

exports.signup= async(req,res)=>{
    try{

        const {userName, email, password}=req.body;

        if(!userName || !email || !password ){
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }

        // Check if userName or email already exists
    const existingUser = await User.findOne({
        $or: [{ email }, { userName }],
      });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username or Email already exists. Please choose a different one.",
        });
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
        const profilePicture=`https://api.dicebear.com/5.x/initials/svg?seed=${userName} ${""}`

        const newUser=await User.create({userName,email ,password: hashedPassword,profilePicture});   
        // console.log(newUser);
        return res.status(201).json({
            success: true,
            message: "User signup successfully.",
            // newUser,
        })     
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in sign up.",
           
        })
    }
}

// signin ka handler

exports.signin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(402).json({
                success: false,
                message: "All fields are required.",
            })
        }

        let user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not exists.",
            })
        }
        if(await bcrypt.compare(password, user.password)){
            // create token and send with user data
            const payload={
                email: user.email,
                id: user._id,
            };
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: "2h"
            })

            user=user.toObject();
            user.token = token;
            user.password = undefined;
            // console.log(user);
            const options={
                    expires: new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly: true,
            }
            res.cookie("token",token,options)
                .status(200).json({
                    success: true,
                    token,
                    user,
                    message:"User logged in successfully."
                })
        }
        else{
            return res.status(403).json({
                success: false,
                message: "Password does not match.",
            })
        }
        
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in signin.",
        })
    }
}

exports.google=async(req,res)=>{
    try{

        const {userName,email,password,profilePicture}=req.body;

        let user=await User.findOne({email}); 
        console.log(user);

        if(user){
            const payload={
                email: user.email,
                id: user._id,
            };
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: "2h"
            })
            user=user.toObject();
            user.token = token;
            user.password = undefined;
            const options={
                    expires: new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly: true,
            }
            return res.cookie("token",token,options)
                .status(200).json({
                    success: true,
                    token,
                    user,
                    message:"User logged in successfully."
                })         
        }
        let hashedPassword;
        try {
 
            hashedPassword=await bcrypt.hash(password,10)
            console.log(hashedPassword);

        } catch (error) {
            console.log("Error in hashing the password ",error)
        }
        // console.log("create ni kr skte")
        // const profilePicture=``
        const newUser= await User.create({userName,email,password,profilePicture});
        console.log(newUser);
        return res.status(200).json({
            success: true,
            message: "User sign up",
        })

    }
    catch(error){
        console.log("Error in signIn/signUp using google.",error);
        res.status(500).json({
            success: false,
            message: "Cannot authenticate using google.",
        })
    }
}