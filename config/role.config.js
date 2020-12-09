const AccessControl = require("accesscontrol");

const data = {
    guest: {
        profile: {
            'read:own': ['*']
        }
    },
    marketing_sales: {
        profile: {
            'read:own': ['*']
        }
    },
    super_admin: {
        profile: {
            'read:own': ['*']
        }
    },
    admin_marketing: {
        profile: {
            'read:any': ['*']
        } 
    },
    admin: {
        profile: {
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    test_admin: {
        profile: {
            'update:any': ['*'],
            'delete:any': ['*']
        }

    },
    test_admin_2: {
        profile: {
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }

    }
}



exports.roles = new AccessControl(data);