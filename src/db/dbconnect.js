require('dotenv/config');
const logger = require('./src/logger/logger');
const mongoose = require('mongoose');
const { DB_USER, DB_PWD, DB_HOST, DB_NAME } = process.env;
const URI = `mongodb+srv://${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
const OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
//es buena practica async await para base de datos?
const dbconnect = async () => {
  try {
    await mongoose.connect(URI, OPTIONS);
    logger.info("MongoDB is connected");
  } catch (error) {
    logger.error("Error in connection", error);
    process.exit(1);
  }

  return mongoose.connection;
};

module.exports = dbconnect;