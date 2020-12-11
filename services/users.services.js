
const { v1 : uuid1 } = require('uuid');
const db = require("../models/postgres/index");
const { Sequelize } = require('sequelize');
const moment = require('moment');
const Users = db.Users;
const Op = Sequelize.Op;


const defaultField = ['id', 'name', 'email', 'uuid'];

exports.createAllUserUUID = async (req, res) => {
    /**
     * Generate UUID every users that doesn't have RANDOM ID
     * Condition = Where uuid has NULL value
     */
    const condition = { uuid : null };
    var usersWithoutUid = await Users.findAll({
        where: condition,
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
        attributes: defaultField,
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
        name: data.name,
        email: data.email,
        password: data.password,
        updated_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss"),
    },{
        attributes: defaultField,
        where: condition,
        returning: true,
        plain: true
    })

    return result;
}

exports.createUser = async (data) => {
    /**
     * Create or Insert user data
     */
    var result = await Users.create({
        name: data.name,
        email: data.email,
        password: data.password,
        updated_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss"),
        created_at: moment().tz('Asia/Jakarta').format("YYYY-MM-DD HH:mm:ss"),
        uuid: uuid1(),
    })

    return result;
}

exports.deleteUser = async (UUID) => {
    /**
     * Delete user data
     */
    var result = await Users.destroy({
        where: {
            uuid: UUID
        }
    })

    return result;
}

exports.getUserByUUID = async (UUID) => {
    /**
     * Select selected user select by UUID
     */
    var result = await Users.findOne({
        attributes: defaultField,
        where: {
            uid: UUID
        }
    });

    return result;
}

exports.getUsers = async () => {
    /**
     * Select all users
     */
     var result = await Users.findAll({
         attributes: defaultField,
     });
     return result;
}