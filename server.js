const express = require('express');
const cors = require('cors');
const dbConnection = require('./src/db/dbconnect');
const logger = require('./src/logger/logger');
const websocket = require('./src/websocket/websocket');
require('dotenv/config');
const mongoose = require('mongoose');
const PORT = process.env.PORT;

const app = express()
  .use(express.json())
  .use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }))
  .use('/', require('./src/routes'));
const httpServer = require('http').createServer(app);



dbConnection.once('open', () => {

  httpServer.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
  // websocket(httpServer, dbConnection);
});


dbConnection.on('error', (error) => logger.error(`Error connecting to database: ${error.message}`));
