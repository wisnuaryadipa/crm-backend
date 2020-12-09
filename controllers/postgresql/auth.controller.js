const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { _ } = require('lodash');
const { Sequelize } = require('sequelize');
const db = require("../../models/postgres/index");
const { Roles } = require('../../models/postgres/index');
const Sales = db.Sales;
const Op = Sequelize.Op;

async function validatePassword(plainPassword, hashedPassword) {
    
    hash = hashedPassword.replace(/^\$2y(.+)$/i, '$2a$1');
    return await bcrypt.compare(plainPassword, hash);
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Sales.findOne(
            { 
                where: { email: email }, 
                include: {
                    model: Roles,
                    as: 'Roles',
                    attributes: [
                        'name',
                        'display_name',
                        'id'
                    ]
                }
            }
        );
        if (!user) return next(new Error('Email does not exist'));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('Password is not correct'));
        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.status(200).json({
            data: { email: user.email, role: user.Roles },
            accessToken
        });
    } catch (error) {
        next(error);
    }
}