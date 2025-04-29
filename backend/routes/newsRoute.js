const express= require("express");
const router=express.Router();

const {checkFakeNews,summarizeNews}=require("../controllers/newsController")
router.post("/fakeNewsCheck",checkFakeNews)
router.post("/summarize",summarizeNews)

module.exports=router;