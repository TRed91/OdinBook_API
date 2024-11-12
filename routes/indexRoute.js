const { Router } = require('express');
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const likeRoute = require('./likeRoute');
const unauthorizedRoute = require('./unauthorizedRoute');
const loginRoute = require('./loginRoute');
const router = Router();

router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/like', likeRoute);
router.use('/unauthorized', unauthorizedRoute);
router.use('/login', loginRoute);

module.exports = router;