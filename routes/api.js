const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllerPost = require('../controllers/postsCtr');
const controllerComment = require('../controllers/commentCtr');
const savePicture = require('../middleware/savePicture');

router.use(passport.authenticate('jwt', { session: false }));

/* Необходимые эндпоинты */ 

router.get('/posts',  controllerPost.getPost);
router.post('/posts', savePicture,  controllerPost.createPost);


router.get('/posts/:postId/', controllerPost.getSinglePost);

router.patch('/posts/:postId/', savePicture, controllerPost.updatePost);
router.delete('/posts/:postId/', controllerPost.removePost);

router.get('/posts/:postId/comments', controllerComment.getAllPostComments);
router.post('/posts/:postId/comments', controllerComment.createComment);
router.delete('/posts/:postId/comments', controllerComment.removeAllComments);

router.delete('/comment/:commentId', controllerComment.removeComment);

router.get(  '/comment/:commentId', controllerComment.getSingleComment);
router.patch('/comment/:commentId', controllerComment.updateComment);

module.exports = router;
