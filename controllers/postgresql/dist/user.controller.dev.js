"use strict";

var userServices = require('../../services/users.services');

exports.generateUid = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(userServices.generateUid());

        case 3:
          usersWithoutUid = _context.sent;
          console.log(usersWithoutUid);
          res.send(usersWithoutUid);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            message: _context.t0.message || "Some error occurred while retrieving tutorials."
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};