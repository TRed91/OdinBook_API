const { Router } = require('express');
const userRoute = require('./userRoute');
const router = Router();

router.use('/user', userRoute);

module.exports = router;