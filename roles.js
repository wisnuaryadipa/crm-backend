const AccessControl = require("accesscontrol");

const data = {
    guest: {
        profile: {
            'read:own': ['*']
        }
    },
    sales: {
        profile: {
            'read:own': ['*']
        }
    },
    salesAdmin: {
        profile: {
            'read:own': ['*']
        }
    },
    salesSupervisor: {
        profile: {
            'read:any': ['*']
        } 
    },
    direactor: {
        profile: {
            'read:own': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    superAdmin: {
        profile: {
            'read:own': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    }
}



exports.roles = new AccessControl(data);