const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { _ } = require('lodash');
const { Sequelize } = require('sequelize');
const db = require("../../models/postgres/index");
const { Roles } = require('../../models/postgres/index');
const UserService = require('../../services/users.services')
const Sales = db.Sales;
const Users = db.Users;
const Op = Sequelize.Op;

async function validatePassword(plainPassword, hashedPassword) {
    
    hash = hashedPassword.replace(/^\$2y(.+)$/i, '$2a$1');
    return await bcrypt.compare(plainPassword, hash);
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userSelected = await UserService.getUserByEmailForLogin(email);
        if (!userSelected) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, userSelected.password);
        if (!validPassword) return next(new Error('Password is not correct'));
        const accessToken = jwt.sign({ userId: userSelected.id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.status(200).json({
            data: { email: userSelected.email, role: userSelected.Roles },
            accessToken
        });
    } catch (error) {
        next(error);
    }
}