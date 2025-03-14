const express = require("express")

const router = express.Router()

const {verifyUser}=require("../utils/verifyUser")
const {create} = require("../controllers/postController")
const {getPosts}= require("../controllers/postController")

router.post("/create",verifyUser,create)
router.get("/getPosts",getPosts)


module.exports=router;