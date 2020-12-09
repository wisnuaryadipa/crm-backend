'use strict';

const Roles = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        display_name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        sub_role: {
            type: Sequelize.STRING
        },
    });
    Roles.associate = function(models) {
        Roles.belongsToMany(models.Sales, {through: models.RoleToUser, foreignKey: 'role_id', as: 'Users'})
      };
    return Roles;
}

module.exports = Roles;