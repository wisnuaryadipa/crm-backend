'use strict';

var Users = function Users(sequelize, Sequelize) {
  var Users = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    created_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    uuid: {
      type: Sequelize.STRING
    }
  });

  Users.associate = function (models) {
    Users.belongsToMany(models.Roles, {
      through: models.RoleToUser,
      foreignKey: 'user_id',
      as: 'Roles'
    });
  };

  return Users;
};

module.exports = Users;