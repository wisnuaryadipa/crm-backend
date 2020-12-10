
const { v1 : uuid1 } = require('uuid');
const db = require("../models/postgres/index");
const { Sequelize } = require('sequelize');
const moment = require('moment');
const Users = db.Users;
const Op = Sequelize.Op;


exports.createAllUserUUID = async (req, res) => {
    /**
     * Generate UUID every users that doesn't have RANDOM ID
     * Condition = Where uuid has NULL value
     */
    const condition = { uuid : null };
    var usersWithoutUid = await Users.findAll({
        where: { uuid: null },
        order: ['id'],
    });
    usersWithoutUid = await Promise.all(usersWithoutUid.map( res => {
        return res = this.updateByIdForNullUUID(res.id)
    }));
    return usersWithoutUid;
}

exports.updateByIdForNullUUID = async (userId) => {
    /**
     * Update or Edit user table by ID
     */
    const condition = { id : userId };
    var result = await Users.update({
        uuid: uuid1(),
        updated_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss"),
    },{
        where: condition,
        returning: true,
        plain: true
    })

    return result;
}

exports.updateByUUID = async (UUID, data) => {
    /**
     * Update or Edit user table by UUID
     */
    const condition = { uuid : UUID };
    var result = await Users.update({
        uuid: uuid1(),
        updated_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss"),
    },{
        where: condition,
        returning: true,
        plain: true
    })

    return result;
}

