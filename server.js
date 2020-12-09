const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const { authJwt } = require("./middlewares");
const routes = require('./routes/routes.js');
const app = express();
const { 
    ENV, 
    MONGO_ATLAS_DBNAME, 
    MONGO_ATLAS_PW, 
    MONGO_ATLAS_USERNAME
} = require('./config/index.config');
 
require("dotenv").config({
    path: path.join(__dirname, "../.env")
   });
 
const PORT = process.env.PORT || 3000;
 
// mongoose.connect('mongodb+srv://'+
//     MONGO_ATLAS_USERNAME + 
//     ':'+ 
//     MONGO_ATLAS_PW + 
//     '@alphabeth-i35ed.mongodb.net/' + 
//     MONGO_ATLAS_DBNAME + 
//     '?retryWrites=true&w=majority', { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     })
//     .then(() => {
//         console.log("Successfully connect to MongoDB.");
//     })
//     .catch(err => {
//         console.error("Connection error", err);
//         process.exit();
//     });

const db = require("./config/index.config");
db.sequelize.sync();
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(authJwt.verifyToken);
 
app.use('/api/v1/', cors(), routes); 

app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})