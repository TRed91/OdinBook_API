const loginController = require('../controllers/loginController');
const authentication = require('../authentication/authentication');
const { Router } = require('express');
const router = new Router();

router.post('/', loginController.loginPost);
router.get('/', authentication, loginController.checkToken);

module.exports = router;