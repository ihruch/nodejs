const express = require('express');
const router = express.Router();
const controller = require('../controllers/postsController');

/* 
Необходимые эндпоинты
 */ 
router.get('/posts', controller.getPosts);

router.post('/posts', controller.createPost)


router.get('/posts/:postId/', controller.getSinglePost);

router.delete('/posts/:postId/', controller.removePost);

router.patch('/posts', controller.editPost);


/*  */
/*  */
/*  */


/* 
экспорт роутера
 */
module.exports = router;
