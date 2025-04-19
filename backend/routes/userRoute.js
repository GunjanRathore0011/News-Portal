const express= require("express");
const router=express.Router();

const {updateUser}=require("../controllers/updateController")
const {verifyUser}=require("../utils/verifyUser")
const {deleteUser,signOut}=require("../controllers/deleteController")
const {getUsers, deleteUserByAdmin,getUserById}=require("../controllers/userController")


router.put("/update/:userId",verifyUser,updateUser)
router.delete("/delete/:userId",verifyUser,deleteUser)
router.delete("/signOut",signOut)

router.get("/getUsers",verifyUser, getUsers)
router.delete("/deleteUser/:userId",verifyUser,deleteUserByAdmin)

router.get("/getUser/:userId",verifyUser,getUserById)

module.exports=router;