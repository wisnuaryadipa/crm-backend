"use strict";

var express = require('express');

var router = express.Router();

var _require = require("../middlewares"),
    authJwt = _require.authJwt,
    accessControl = _require.accessControl;

var userRouter = require('./users.routes');

var storeRouter = require('./stores.routes');

var visitRouter = require('./visits.routes');

var userController = require('../controllers/userController');

var usersController = require('../controllers/postgresql/user.controller');

var salesController = require('../controllers/postgresql/sales.controller');

var authController = require('../controllers/postgresql/auth.controller');

var _require2 = require('./users.routes'),
    route = _require2.route;

router.post('/signup', userController.signup);
router.post('/login', authController.signin);
router.get('/sales', authJwt.allowIfLoggedin, accessControl.grantAccess('readOwn', 'profile'), salesController.findAll);
router.get('/createUid', usersController.generateUid);
router.use('/users/', userRouter);
router.use('/stores', storeRouter);
router.use('/visits', visitRouter);
module.exports = router;