"use strict";

var _require = require('sequelize'),
    Sequelize = _require.Sequelize;

var Sales = require('./sales.model');

var Roles = require('./roles.model');

var Users = require('./users.model');

var RoleToUser = require('./roleToUser.model');

var db = require("../../config/index.config");

models = {};
models.Sales = Sales(db.sequelize, Sequelize);
models.Roles = Roles(db.sequelize, Sequelize);
models.Users = Users(db.sequelize, Sequelize);
models.RoleToUser = RoleToUser(db.sequelize, Sequelize); //Declare all asociate from each model

Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});
module.exports = models;