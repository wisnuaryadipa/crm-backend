const User = require("../models/postgres").Sales;
const jwt = require('jsonwebtoken');
const path = require('path');
require("dotenv").config({
    path: path.join(__dirname, "../../.env")
});

verifyToken = async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Unauthorized!", error: err });
            }
            return decoded;
        });
        // Check if token has expired   
        if (exp < Date.now().valueOf() / 1000) { 
            return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
        }
        res.locals.loggedInUser = await User.findByPk(userId, {
            include: 'Roles'
        }); 
        next();
    } else { 
        next(); 
    } 
};

allowIfLoggedin = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
        return res.status(401).json({
            error: "You need to be logged in to access this route"
        });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

const authJwt = {
    verifyToken,
    allowIfLoggedin
};
module.exports = authJwt;