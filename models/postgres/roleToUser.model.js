'use strict';
const RoleToUser = (sequelize, Sequelize) => {
    const RoleToUser = sequelize.define("role_user", {
        user_id: {
            type: Sequelize.INTEGER
        },
        role_id: {
            type: Sequelize.INTEGER,
        }
    });
    RoleToUser.associate = function(models) {
        RoleToUser.belongsTo(models.Sales, {foreignKey: 'user_id'})
        RoleToUser.belongsTo(models.Roles, {foreignKey: 'role_id'})
    }
    return RoleToUser;
}

module.exports = RoleToUser;