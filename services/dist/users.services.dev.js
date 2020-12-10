"use strict";

var _this = void 0;

var _require = require('uuid'),
    uuid1 = _require.v1;

var db = require("../models/postgres/index");

var _require2 = require('sequelize'),
    Sequelize = _require2.Sequelize;

var moment = require('moment');

var Users = db.Users;
var Op = Sequelize.Op;

exports.createAllUserUUID = function _callee(req, res) {
  var condition, usersWithoutUid;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          /**
           * Generate UUID every users that doesn't have RANDOM ID
           * Condition = Where uuid has NULL value
           */
          condition = {
            uuid: null
          };
          _context.next = 3;
          return regeneratorRuntime.awrap(Users.findAll({
            where: {
              uuid: null
            },
            order: ['id']
          }));

        case 3:
          usersWithoutUid = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(Promise.all(usersWithoutUid.map(function (res) {
            return res = _this.updateByIdForNullUUID(res.id);
          })));

        case 6:
          usersWithoutUid = _context.sent;
          return _context.abrupt("return", usersWithoutUid);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.updateByIdForNullUUID = function _callee2(userId) {
  var condition, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          /**
           * Update or Edit user table by ID
           */
          condition = {
            id: userId
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(Users.update({
            uuid: uuid1(),
            updated_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss")
          }, {
            where: condition,
            returning: true,
            plain: true
          }));

        case 3:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.updateByUUID = function _callee3(UUID, data) {
  var condition, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          /**
           * Update or Edit user table by UUID
           */
          condition = {
            uuid: UUID
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(Users.update({
            uuid: uuid1(),
            updated_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss")
          }, {
            where: condition,
            returning: true,
            plain: true
          }));

        case 3:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};