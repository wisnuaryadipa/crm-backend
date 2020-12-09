const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authJwt, accessControl } = require("../middlewares");


router.get('/:storeId', authJwt.allowIfLoggedin, accessControl.grantAccess('readOwn', 'profile'), userController.getUser);
router.put('/:storeId', authJwt.allowIfLoggedin, accessControl.grantAccess('updateAny', 'profile'), userController.updateUser);
router.delete('/:storeId', authJwt.allowIfLoggedin, accessControl.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;