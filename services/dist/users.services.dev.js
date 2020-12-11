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
var defaultField = ['id', 'name', 'email', 'uuid'];

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
            where: condition,
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
            attributes: defaultField,
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
            name: data.name,
            email: data.email,
            password: data.password,
            updated_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss")
          }, {
            attributes: defaultField,
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

exports.createUser = function _callee4(data) {
  var result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Users.create({
            name: data.name,
            email: data.email,
            password: data.password,
            updated_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss"),
            created_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss"),
            uuid: uuid1()
          }));

        case 2:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteUser = function _callee5(UUID) {
  var result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Users.destroy({
            where: {
              uuid: UUID
            }
          }));

        case 2:
          result = _context5.sent;
          return _context5.abrupt("return", result);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.getUserByUUID = function _callee6(UUID) {
  var result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Users.findOne({
            attributes: defaultField,
            where: {
              uid: UUID
            }
          }));

        case 2:
          result = _context6.sent;
          return _context6.abrupt("return", result);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getUsers = function _callee7() {
  var result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Users.findAll({
            attributes: defaultField
          }));

        case 2:
          result = _context7.sent;
          return _context7.abrupt("return", result);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};