const { Router } = require('express');
const userController = require('../controllers/userController');
const authentication = require('../authentication/authentication');
const router = Router();

router.get('/', userController.userGetAll);
router.get('/:userId', userController.userGetOne);
router.post('/', userController.userAdd);
router.put('/:userId', authentication, userController.userUpdate);
router.put('/:userId/follow/:followId', authentication, userController.userAddFollow);
router.delete('/:userId', authentication, userController.userDelete);

module.exports = router;