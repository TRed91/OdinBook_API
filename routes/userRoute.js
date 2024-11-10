const { Router } = require('express');
const userController = require('../controllers/userController');
const authentication = require('../authentication/authentication');
const router = Router();

router.get('/:userId', userController.userGetOne);
router.post('/', userController.userAdd);
router.put('/:userId', authentication, userController.userUpdate);
router.delete('/:userId', authentication, userController.userDelete);

module.exports = router;