const bcrypt=require("bcrypt");
const User=require("../models/userModel")

exports.updateUser=async(req,res)=>{
    try{
        // console.log(req.user);
        if(req.user.id!=req.params.userId){
            return res.status(403).json({
                success: false,
                message: "You can only update your own account."
            })
        }
        // console.log("ye rahi  request body.. ",req.user);
 
       

        if(req.body.password){
            if(req.body.password.length<8){
                return res.status(400).json({
                    success: false,
                    message: "Password must be atleast 8 characters.",
                })
            }
            const hashedPassword=await bcrypt.hash(req.body.password,10);
        req.body.password=hashedPassword;
        }
        

        if(req.body.userName){
            if(req.body.userName.length <5 || req.body.userName.length >20){
                return res.status(400).json({
                    success: false,
                    message: "Username must be between 5 and 20 characters."
                })        
            }
        }

        if (!req.body.userName.match(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)) {
            return res.status(400).json({
                success: "false",
                message: "Username can only contain letters, numbers, and spaces (no leading/trailing spaces)."
            });
        }
        
    const newProfilePicture=`https://api.dicebear.com/5.x/initials/svg?seed=${req.body.userName} ${""}`

        const updatedUser= await User.findByIdAndUpdate(req.params.userId,{
                            $set:{
                                userName: req.body.userName,
                                email: req.body.email,
                                profilePicture: newProfilePicture,
                                password: req.body.password,
                            },

        },{new: true} )

    updatedUser.password=undefined;
    return res.status(200).json({
        success:true,
        message:"User data updated successfully.",
        user:updatedUser
    })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating the data.Please try again."
        })
    }
}