const Post = require("../models/postModel")

exports.create = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json(
                {
                    success: false,
                    message: "You are not authorized to create a post."
                }
            )
        }
        if(!req.body.title || !req.body.content){
            return res.status(400).json({
                success: false,
                message: "Title and content are required."
            })
        }

        const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/^a-z0-9/g, "");

        const newPost = new Post({
            ...req.body,
            slug:slug,
            userId:req.user._id,
        })

        const savedPost = await newPost.save();
        return res.status(201).json({
            success: true,
            message: "Post created successfully.",
            post:savedPost
     
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}