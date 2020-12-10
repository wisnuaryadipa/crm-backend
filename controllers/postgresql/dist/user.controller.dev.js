"use strict";

var userServices = require('../../services/users.services');

exports.generateUsersUUID = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(userServices.createAllUserUUID());

        case 3:
          result = _context.sent;
          res.send(result);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send({
            message: _context.t0.message || "Some error occurred while retrieving tutorials."
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};