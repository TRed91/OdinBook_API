const { Router } = require('express');
const postController = require('../controllers/postController');
const authentication = require('../authentication/authentication');
const router = Router();

router.post('/', authentication, postController.createPost);
router.get('/:postId', postController.getPost);
router.get('/user/:userId', authentication, postController.getPostsByUserAndFollows);
router.put('/:postId', authentication, postController.updatePost);
router.delete('/:postId', authentication, postController.deletePost);

module.exports = router;