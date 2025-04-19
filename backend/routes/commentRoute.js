const express = require('express');
const router = express.Router();

const { createComment ,getPostComments,likeComment,editComment,deleteComment} = require('../controllers/commentController');
const { verifyUser } = require('../utils/verifyUser');

router.post('/create',verifyUser, createComment); 
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment', verifyUser, likeComment); 
router.put('/editComment', verifyUser, editComment);
router.delete('/deleteComment', verifyUser, deleteComment);


module.exports = router;