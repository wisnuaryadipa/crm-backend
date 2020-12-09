const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.VAL_PG_DBNAME, process.env.VAL_PG_USERNAME, process.env.VAL_PG_PASSWORD, {
  host: process.env.VAL_PG_HOST,
  dialect: "postgres",
  port: process.env.PORT,
  schema: "master",
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true,
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.sales = require("../models/postgres/index")(sequelize, Sequelize).sales;

module.exports = db;