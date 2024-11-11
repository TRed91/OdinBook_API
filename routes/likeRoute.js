const { Router } = require('express');
const likeController = require('../controllers/likeController');
const authentication = require('../authentication/authentication');
const router = Router();

router.get('/:postId', likeController.getLikes);
router.get('/:postId/user/:userId', likeController.getLikeOne);
router.post('/:postId', authentication, likeController.addLike);
router.delete('/:postId', authentication, likeController.removeLike);

module.exports = router;