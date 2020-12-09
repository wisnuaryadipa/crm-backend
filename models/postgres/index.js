const { Sequelize } = require('sequelize');
const Sales = require('./sales.model');
const Roles = require('./roles.model');
const Users = require('./users.model');
const RoleToUser = require('./roleToUser.model');
const db = require("../../config/index.config");

models = {};
models.Sales = Sales(db.sequelize, Sequelize);
models.Roles = Roles(db.sequelize, Sequelize);
models.Users = Users(db.sequelize, Sequelize);
models.RoleToUser = RoleToUser(db.sequelize, Sequelize);

//Declare all asociate from each model
Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});
module.exports = models;