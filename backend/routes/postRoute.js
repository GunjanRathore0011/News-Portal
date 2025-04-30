const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { verifyUser } = require("../utils/verifyUser");
const { create, deletePost, getPosts } = require("../controllers/postController");

router.post("/create", verifyUser, upload.single("image"), create);
router.get("/getPosts", getPosts);
router.delete("/deletePost/:postId", verifyUser, deletePost);

module.exports = router;
