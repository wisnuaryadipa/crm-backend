const { roles } = require('../config/role.config');

grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const roleGiven = req.user.Roles;

            //Check every role given to user
            const permission = permissionCheck(roleGiven, action, resource);

            if (!permission.granted) {
                //action when don't have permission
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            req.attributeAllowed = permission;
            next();
            
        } catch (error) {
            next(error);
        }
    }
}

permissionCheck = (roleGiven, action, resource) => {
    var permission = {};
    //RBAC (Role Based Access Control)
    roleGiven.some((obj) => {
        permission = roles.can(obj.name)[action](resource);
        if (permission.granted) {
            return permission.granted;
        }
    });
    return permission;
}

const accessControl = {
    grantAccess,
};

module.exports = accessControl;