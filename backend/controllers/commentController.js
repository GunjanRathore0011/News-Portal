const Comment = require("../models/commentModel")

exports.createComment = async (req, res) => {   

try{

    const{userId, postId , content}=req.body;
    // console.log(userId,req.user);
    if(userId!=req.user.id){
        return res.status(403).json({message: "You are not allowed to create a comment"});
    }
    // if a user has already commented on the post, then he cannot comment again
    const existingComment = await Comment.findOne({userId, postId});
    if(existingComment){   
        return res.status(400).json({message: "You have already commented on this post"});
    }
    if(!content){
        return res.status(400).json({message: "Comment content is required"});
    }
    const comment = new Comment({
        userId,
        postId,
        content,
    });
    await comment.save();
    return res.status(201).json({message: "Comment created successfully", comment});

}catch(err){
    console.log(err);
    return res.status(500).json({message: "Internal server error"});
}
}

exports.getPostComments = async (req, res) => {
    try{
        const postId = req.params.postId || req.query.postId;
        if(!postId){
            return res.status(400).json({message: "Post ID is required"});
        }
        const comments = await Comment.find({postId}).sort({createdAt: -1});
        if(!comments || comments.length === 0){
            return res.status(404).json({message: "No comments found for this post"});
        }
        return res.status(200).json({message: "Comments fetched successfully", comments});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

// likes handler

exports.likeComment = async (req, res) => {
    try{
        const {commentId, userId} = req.body;
        if(!commentId || !userId){
            return res.status(400).json({message: "Comment ID and User ID are required"});
        }
        const comment = await Comment.findById(commentId);
        // console.log(comment);

        if(comment.likes.includes(userId)){
            // user already liked the comment, so we need to unlike it
            comment.likes = comment.likes.filter((id) => id !== userId);
            comment.numberOfLikes -= 1;
        }
        else{
            // user has not liked the comment yet, so we need to like it
            comment.likes.push(userId);
            comment.numberOfLikes += 1;
        }
        await comment.save();
        return res.status(200).json({message: "Comment liked/unliked successfully", comment});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

// edit handler
exports.editComment = async (req, res) => {
    try{
        const {commentId, content,userId} = req.body;

        if(!content){
            return res.status(400).json({message: "Comment content is required"});
        }
        const comment = await Comment.findById(commentId);
        if(comment.userId !== userId){
            return res.status(403).json({
                success: false, 
                message: "You are not allowed to edit this comment"});
        }
        const newComment = await Comment.findByIdAndUpdate(commentId, {content}, {new: true});
        return res.status(200).json({
            success: true,
            message: "Comment updated successfully", newComment});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}


// delete handler

exports.deleteComment = async (req, res) => {
    try{
        const{commentId, userId} = req.body;

        const comment = await Comment.findById(commentId);
        if(comment.userId !== userId){
            return res.status(403).json({
                success: false, 
                message: "You are not allowed to delete this comment"});
        }
        const deletedComment=await Comment.findByIdAndDelete(commentId);
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            deletedComment});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}