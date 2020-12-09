const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authJwt, accessControl } = require("../middlewares");

router.get('/:userId', authJwt.allowIfLoggedin, accessControl.grantAccess('readOwn', 'profile'), userController.getUser);
router.put('/:userId', authJwt.allowIfLoggedin, accessControl.grantAccess('updateAny', 'profile'), userController.updateUser);
router.delete('/:userId', authJwt.allowIfLoggedin, accessControl.grantAccess('deleteAny', 'profile'), userController.deleteUser);

router.get('/:userId/visits', authJwt.allowIfLoggedin, accessControl.grantAccess('readOwn', 'profile'), userController.getUser);
router.get('/:userId/stores', authJwt.allowIfLoggedin, accessControl.grantAccess('readOwn', 'profile'), userController.getUser);
router.get('/:userId/stores/:storeId', authJwt.allowIfLoggedin, accessControl.grantAccess('readOwn', 'profile'), userController.getUser);
router.get('/:userId/stores-creator', authJwt.allowIfLoggedin, accessControl.grantAccess('readOwn', 'profile'), userController.getUser);
router.get('/', authJwt.allowIfLoggedin, accessControl.grantAccess('readAny', 'profile'), userController.getUsers);

module.exports = router;