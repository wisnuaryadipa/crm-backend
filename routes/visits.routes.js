const express = require('express');
const router = express.Router();
const { authJwt, accessControl } = require("../middlewares");

router.get('/id/:visitId', authJwt.allowIfLoggedin);
router.get('/sales-id/:salesId', authJwt.allowIfLoggedin);
router.get('/store-id/:storeId', authJwt.allowIfLoggedin);
router.get('/repeat-order-status/:repeatOrderStatus', authJwt.allowIfLoggedin);
router.get('/sales/:visitId', authJwt.allowIfLoggedin);

module.exports = router;