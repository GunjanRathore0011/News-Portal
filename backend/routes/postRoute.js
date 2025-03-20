const express = require("express")

const router = express.Router()

const {verifyUser}=require("../utils/verifyUser")
const {create, deletePost} = require("../controllers/postController")
const {getPosts}= require("../controllers/postController")

router.post("/create",verifyUser,create)
router.get("/getPosts",getPosts)
router.delete("/deletePost/:postId",verifyUser,deletePost)

module.exports=router;