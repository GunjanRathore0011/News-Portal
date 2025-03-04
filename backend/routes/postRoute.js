const express = require("express")

const router = express.Router()

const {verifyUser}=require("../utils/verifyUser")
const {create} = require("../controllers/postController")

router.post("/create",verifyUser,create)

module.exports=router;