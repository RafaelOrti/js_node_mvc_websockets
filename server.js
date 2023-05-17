const express = require('express');
const cors = require('cors');
const db = require('./src/db/dbconnect');
const logger = require('./src/logger/logger');
const websocket = require('./src/websocket/websocket');
require('dotenv/config');
const PORT = process.env.PORT;

const app = express()
.use(express.json())
.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}))
.use('/',require('./src/routes'));
const httpServer = require('http').createServer(app);

db.then((connection) => {
  httpServer.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });

  connection.once('open', () => {
    websocket(httpServer, connection);
  });

}).catch((err) => {
  logger.error(`Error connecting to database: ${err.message}`);
});
