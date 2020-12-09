const db = require("../models/postgres/index");
const { Sequelize } = require('sequelize');
const Users = db.Users;
const Op = Sequelize.Op;


exports.generateUid = async (req, res) => {
    const condition = { uuid : null };
    var c = await Users.findAll({
        where: { uuid: null },
        order: ['id'],
    })
    .then(data => {
        // console.log(data);
        return data;
    });
    
    return c;
    
}

exports.updateById = async (req, res) => {

}