const express= require("express");
const router=express.Router();

const {updateUser}=require("../controllers/updateController");
const {verifyUser}=require("../utils/verifyUser")

router.put("/update/:userId",verifyUser,updateUser)

module.exports=router;