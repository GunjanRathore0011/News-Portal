const User=require("../models/userModel");

exports.deleteUser=async(req,res)=>{
    try{
        const userid=req.params.userId;
        if(req.user.id!=req.params.userId){
            return res.status(403).json({
                success: false,
                message: "You can only delete your own account."
            })
        }

        const deletedUser=await User.findByIdAndDelete({_id:userid})
        // console.log(deletedUser);
        return res.status(200).json({
            success: true,
            message: "User account deleted successfully."
        })
    }
    catch(error){
        console.log("Yeh rahi error ",error);
        return res.status(500).json({
            success: false,
            message: "Cannot delete account.Please try again."
        })
    }
}

exports.signOut=async(req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "User sign out successsfully."
        })
    }
    catch(error){
        console.log("Error in sign ou",error);
        return res.status(500).json({
            success: false,
            message: "Sign out successfully."
        })
    }
}