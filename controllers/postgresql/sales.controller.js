const db = require("../../models/postgres/index");
const UserService = require('../../services/users.services')
const { Sequelize } = require('sequelize');
const Sales = db.Sales;
const Roles = db.Roles;
const RoleToUser = db.RoleToUser;
const Op = Sequelize.Op;

exports.findAll = async (req, res) => {
  try {
      const name = req.query.name;
      result = await UserService.getUsersByName(name);
      res.send(result);
  } catch (err) {
      console.log(err);
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving tutorials."
      });
  }
};