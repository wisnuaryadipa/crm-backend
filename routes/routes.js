const express = require('express');
const router = express.Router();
const { authJwt, accessControl } = require("../middlewares");
const userRouter = require('./users.routes');
const storeRouter = require('./stores.routes');
const visitRouter = require('./visits.routes');
const userController = require('../controllers/userController');
const usersController = require('../controllers/postgresql/user.controller');
const salesController = require('../controllers/postgresql/sales.controller')
const authController = require('../controllers/postgresql/auth.controller');
const { route } = require('./users.routes');

router.post('/signup', userController.signup);
router.post('/login', authController.signin);
router.get('/sales', authJwt.allowIfLoggedin, accessControl.grantAccess('readOwn', 'profile'), salesController.findAll);

router.get('/createUid', usersController.generateUid);

router.use('/users/', userRouter);
router.use('/stores', storeRouter);
router.use('/visits', visitRouter);



module.exports = router;