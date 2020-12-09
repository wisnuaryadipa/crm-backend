"use strict";

var User = require("../models/postgres").Sales;

var jwt = require('jsonwebtoken');

var path = require('path');

require("dotenv").config({
  path: path.join(__dirname, "../../.env")
});

verifyToken = function verifyToken(req, res, next) {
  var accessToken, _ref, userId, exp;

  return regeneratorRuntime.async(function verifyToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.headers["x-access-token"]) {
            _context.next = 15;
            break;
          }

          accessToken = req.headers["x-access-token"];
          _context.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(accessToken, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
              return res.status(401).send({
                message: "Unauthorized!",
                error: err
              });
            }

            return decoded;
          }));

        case 4:
          _ref = _context.sent;
          userId = _ref.userId;
          exp = _ref.exp;

          if (!(exp < Date.now().valueOf() / 1000)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            error: "JWT token has expired, please login to obtain a new one"
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(User.findByPk(userId, {
            include: 'Roles'
          }));

        case 11:
          res.locals.loggedInUser = _context.sent;
          next();
          _context.next = 16;
          break;

        case 15:
          next();

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

allowIfLoggedin = function allowIfLoggedin(req, res, next) {
  var user;
  return regeneratorRuntime.async(function allowIfLoggedin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user = res.locals.loggedInUser;

          if (user) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            error: "You need to be logged in to access this route"
          }));

        case 4:
          req.user = user;
          next();
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var authJwt = {
  verifyToken: verifyToken,
  allowIfLoggedin: allowIfLoggedin
};
module.exports = authJwt;