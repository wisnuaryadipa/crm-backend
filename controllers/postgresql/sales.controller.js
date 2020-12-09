const db = require("../../models/postgres/index");
const { Sequelize } = require('sequelize');
const Sales = db.Sales;
const Roles = db.Roles;
const RoleToUser = db.RoleToUser;
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Sales.findAll({ 
      where: condition, 
      order: ['id'] ,
      include: 'Roles'
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};