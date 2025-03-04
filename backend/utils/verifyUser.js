const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel")
//auth 
exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation").replace("Bearer ", "");
        if (!token) {
            return res.status(402).json({
                success: false,
                message: "Token missing",
            })
        }
        console.log("Cookies Token:", req.cookies.token);
        console.log("Body Token:", req.body.token);
        console.log("Header Token:", req.header("Authorization"));

        // console.log(token);
        // verify the token and pass the token in req body
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("It is decode ",decode);
            req.user = decode;
            // console.log(req.user.id);
        }


        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }

        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something wen wrong while verifying the token.Cannot authenticate the user.",
        })
    }
}
