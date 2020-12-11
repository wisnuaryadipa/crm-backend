const userServices = require('../../services/users.services')


exports.generateUsersUUID = async (req, res) => {
    try {
        result = await userServices.createAllUserUUID();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    }
}