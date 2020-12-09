"use strict";

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var _require = require('lodash'),
    _ = _require._;

var _require2 = require('sequelize'),
    Sequelize = _require2.Sequelize;

var db = require("../../models/postgres/index");

var _require3 = require('../../models/postgres/index'),
    Roles = _require3.Roles;

var Sales = db.Sales;
var Op = Sequelize.Op;

function validatePassword(plainPassword, hashedPassword) {
  return regeneratorRuntime.async(function validatePassword$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hash = hashedPassword.replace(/^\$2y(.+)$/i, '$2a$1');
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.compare(plainPassword, hash));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

exports.signin = function _callee(req, res, next) {
  var _req$body, email, password, user, validPassword, accessToken;

  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Sales.findOne({
            where: {
              email: email
            },
            include: {
              model: Roles,
              as: 'Roles',
              attributes: ['name', 'display_name', 'id']
            }
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", next(new Error('Email does not exist')));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(validatePassword(password, user.password));

        case 9:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", next(new Error('Password is not correct')));

        case 12:
          accessToken = jwt.sign({
            userId: user.id
          }, process.env.JWT_SECRET, {
            expiresIn: "1d"
          });
          res.status(200).json({
            data: {
              email: user.email,
              role: user.Roles
            },
            accessToken: accessToken
          });
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};