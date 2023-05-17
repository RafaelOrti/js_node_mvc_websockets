const winston = require('winston');

// Configuración del logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/socket.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  )
});

module.exports = logger;