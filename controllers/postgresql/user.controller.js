const userServices = require('../../services/users.services')


exports.generateUid = async (req, res) => {

    try {
        usersWithoutUid = await userServices.generateUid();
        console.log(usersWithoutUid);
        res.send(usersWithoutUid)
    } catch (err) {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    }
    
    
}