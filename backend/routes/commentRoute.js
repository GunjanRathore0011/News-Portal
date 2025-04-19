const express = require('express');
const router = express.Router();

const { createComment ,getPostComments,likeComment,editComment,deleteComment,getComments} = require('../controllers/commentController');
const { verifyUser } = require('../utils/verifyUser');

router.post('/create',verifyUser, createComment); 
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment', verifyUser, likeComment); 
router.put('/editComment', verifyUser, editComment);
router.delete('/deleteComment', verifyUser, deleteComment);

router.get('/getComments', verifyUser, getComments); 

module.exports = router;