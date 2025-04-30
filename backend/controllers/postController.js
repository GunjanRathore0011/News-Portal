const Post = require("../models/postModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
});

exports.create = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user information found.",
      });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to create a post.",
      });
    }

    const { title, content, category } = req.body;
    if (!title || !content || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and image are required.",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    const slug = title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");

    const newPost = new Post({
      title,
      content,
      category,
      slug,
      image: result.secure_url,
      userId: req.user.id,
    });

    const savedPost = await newPost.save();
    return res.status(201).json({
      success: true,
      message: "Post created successfully.",
      post: savedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


exports.getPosts = async (req, res) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0
      const limit = parseInt(req.query.limit) || 6
  
      const sortDirection = req.query.sort === "asc" ? 1 : -1
  
      const posts = await Post.find({
        ...(req.query.userId  && { userId: req.query.userId }),
  
        ...(req.query.category && { category: req.query.category }),
  
        ...(req.query.slug && { slug: req.query.slug }),
  
        ...(req.query.postId && { _id: req.query.postId }),
  
        ...(req.query.searchTerm && {
          $or: [
            { title: { $regex: req.query.searchTerm, $options: "i" } },
            { content: { $regex: req.query.searchTerm, $options: "i" } },
          ],
        }),
      })
        .sort({ updatedAt: sortDirection })
        .skip(startIndex)
        .limit(limit)
  
      const totalPosts = await Post.countDocuments()
  
      const now = new Date() // 2024 15 Nov
  
      const oneMonthAgo = new Date( // 2024 15 Oct
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      )
  
      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      })
  
      res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts,
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Cannot fetch data"
        });
    }
  }
  

exports.deletePost=async(req,res)=>{
  try{
    if(!req.user.isAdmin){
      res.status(401).json({
        success: true,
        message: "You are not authenticated to delete a post."
      })
    }
    const postId=req.params.postId;
  
    const deletePost= await Post.findByIdAndDelete( {_id: postId})
    // console.log(deletePost)
    if(!deletePost){
      return res.status(401).json({
        success: false,
        message: "Post doesn't exist."
      })
    }
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully."
    })
  }
  catch(error){
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: "Unable to delete post.Try again later."
  });
  }
}