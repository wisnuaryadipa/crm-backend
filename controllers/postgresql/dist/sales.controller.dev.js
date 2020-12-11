"use strict";

var db = require("../../models/postgres/index");

var UserService = require('../../services/users.services');

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var Sales = db.Sales;
var Roles = db.Roles;
var RoleToUser = db.RoleToUser;
var Op = Sequelize.Op;

exports.findAll = function _callee(req, res) {
  var name;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          name = req.query.name;
          _context.next = 4;
          return regeneratorRuntime.awrap(UserService.getUsersByName(name));

        case 4:
          result = _context.sent;
          res.send(result);
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send({
            message: _context.t0.message || "Some error occurred while retrieving tutorials."
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};