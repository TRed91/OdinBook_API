const { Router } = require('express');
const userRoute = require('./userRoute');
const unauthorizedRoute = require('./unauthorizedRoute');
const loginController = require('../controllers/loginController');
const router = Router();

router.use('/user', userRoute);
router.use('/unauthorized', unauthorizedRoute);
router.post('/login', loginController);

module.exports = router;