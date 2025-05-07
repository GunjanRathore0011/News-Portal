const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const { response } = require("express");
require("dotenv").config();

// sign up ka handler

exports.signup = async (req, res) => {
    try {

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
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
        const profilePicture = `https://api.dicebear.com/5.x/initials/svg?seed=${userName} ${""}`

        const newUser = await User.create({ userName, email, password: hashedPassword, profilePicture });
        // console.log(newUser);
        return res.status(201).json({
            success: true,
            message: "User signup successfully.",
            // newUser,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in sign up.",

        })
    }
}

// signin ka handler

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(402).json({
                success: false,
                message: "All fields are required.",
            })
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exists.",
            })
        }
        if (await bcrypt.compare(password, user.password)) {
            // create token and send with user data
            const payload = {
                email: user.email,
                id: user._id,
                isAdmin: user.isAdmin
            };
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })

            user = user.toObject();
            user.token = token;
            user.password = undefined;
            // console.log(user);
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: "None", // Required for cross-site cookie on HTTPS
  secure: true      // Must be true for HTTPSon",

            }
            res.cookie("token", token, options)
                .status(200).json({
                    success: true,
                    token,
                    user,
                    message: "User logged in successfully."
                })
        }
        else {
            return res.status(403).json({
                success: false,
                message: "Password does not match.",
            })
        }


    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in signin.",
        })
    }
}

exports.google = async (req, res) => {
    try {

        const { userName, email, password, profilePicture } = req.body;

        let user = await User.findOne({ email });
        // console.log(user);

        if (user) {
            const payload = {
                email: user.email,
                id: user._id,
                isAdmin: user.isAdmin
            };

            console.log( "payload",payload);

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })

            console.log("token", token);

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            console.log("user", user);
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: "None", // Required for cross-site cookie on HTTPS
  secure: true      // Must be true for HTTPS
                
                
              };
              return res.cookie("token", token, options)
              .status(200).json({
                  success: true,
                  token,
                  user,
                  message: "User logged in successfully."
              });
          
        }
        let hashedPassword;
        try {

            hashedPassword = await bcrypt.hash(password, 10)
            // console.log(hashedPassword);

        } catch (error) {
            console.log("Error in hashing the password ", error)
        }
        // console.log("create ni kr skte")
        // const profilePicture=``
        const newUser = await User.create({ userName, email, password, profilePicture });
        // console.log(newUser);
        return res.status(200).json({
            success: true,
            message: "User sign up",
        })

    }
    catch (error) {
        console.log("Error in signIn/signUp using google.", error);
        res.status(500).json({
            success: false,
            message: "Cannot authenticate using google.",
        })
    }
}


exports.getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(
            errorHandler(403, "You are not authorized to access this resource!")
        )
    }

    try {
        const startIndex = parseInt(req.query.startIndex) || 0
        const limit = parseInt(req.query.limit) || 9
        const sortDirection = req.query.sort === "asc" ? 1 : -1

        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit)

        const getUsersWithoutPassword = users.map((user) => {
            const { password: pass, ...rest } = user._doc

            return rest
        })

        const totalUsers = await User.countDocuments()

        const now = new Date() // 2024 15 Nov

        const oneMonthAgo = new Date( // 2024 15 Oct
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        })

        res.status(200).json({
            Users: getUsersWithoutPassword,
            totalUsers,
            lastMonthUsers,
            success: true,
            message: "Displayed all users.",

        })
    } catch (error) {
        next(error)
    }
}

exports.deleteUserByAdmin = async (req, res) => {
    try {
        const userid = req.params.userId;
        if (userid == req.user.id) {
            const deletedUser = await User.findByIdAndDelete({ _id: userid })
            res.clearCookie("token");
            return res.status(200).json({
                success: true,
                message: "Your account is deleted successsfully."
            })

        }
        const deletedUser = await User.findByIdAndDelete({ _id: userid })
        // console.log(deletedUser);
        return res.status(200).json({
            success: true,
            message: "User account deleted successfully."
        })
    }
    catch (error) {
        console.log("Yeh rahi error ", error);
        return res.status(500).json({
            success: false,
            message: "Cannot delete account.Please try again."
        })
    }
}


// get user by id 
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        const { password, ...rest } = user._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}