"use strict";

var db = require("../models/postgres/index");

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var Users = db.Users;
var Op = Sequelize.Op;

exports.generateUid = function _callee(req, res) {
  var condition, c;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          condition = {
            uuid: null
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(Users.findAll({
            where: {
              uuid: null
            },
            order: ['id']
          }).then(function (data) {
            // console.log(data);
            return data;
          }));

        case 3:
          c = _context.sent;
          return _context.abrupt("return", c);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.updateById = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
        case "end":
          return _context2.stop();
      }
    }
  });
};