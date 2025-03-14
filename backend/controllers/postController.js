const Post = require("../models/postModel")
 
exports.create = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No user information found. Please log in.",
            });
        }
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

        // console.log(req.user)

        const newPost = new Post({
            ...req.body,
            slug:slug,
            userId:req.user.id,
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


exports.getPosts = async (req, res, next) => {
    try {
      const startIndex = parseInt(req.query.startIndex) || 0
      const limit = parseInt(req.query.limit) || 9
  
      const sortDirection = req.query.sort === "asc" ? 1 : -1
  
      const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
  
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
  