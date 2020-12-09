'use strict';
const Sales = (sequelize, Sequelize) => {
    const Sales = sequelize.define("users", {
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
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
    });
    Sales.associate = function(models) {
        Sales.belongsToMany(models.Roles, {through: models.RoleToUser, foreignKey: 'user_id', as: 'Roles'})
      };
    return Sales;
}

module.exports = Sales;