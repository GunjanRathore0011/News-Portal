const express= require("express");
const router=express.Router();

const {updateUser}=require("../controllers/updateController")
const {verifyUser}=require("../utils/verifyUser")
const {deleteUser,signOut}=require("../controllers/deleteController")

router.put("/update/:userId",verifyUser,updateUser)
router.delete("/delete/:userId",verifyUser,deleteUser)
router.delete("/signOut",signOut)

module.exports=router;