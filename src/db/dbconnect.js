require('dotenv/config');
const logger = require('../logger/logger');
const mongoose = require('mongoose');
const {
  DB_USER,
  DB_PWD,
  DB_HOST,
  DB_NAME
} = process.env;
let URI =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// URI='mongodb://localhost:27017/?retryWrites=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000'
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,

};

console.log(URI)
//es buena practica async await para base de datos?
const dbconnect = async () => {
  try {
    mongoose.connect(URI, OPTIONS);
    logger.info("MongoDB is connected");
    return mongoose.connection;
  } catch (error) {
    logger.error("Error in connection", error);
    process.exit(1);
  }

  
};

module.exports = dbconnect();