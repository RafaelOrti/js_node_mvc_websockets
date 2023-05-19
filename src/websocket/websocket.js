const logger = require('../logger/logger');


const initializeSocket = (httpServer, connection) => {
  const io = require('socket.io')(httpServer, { cors: { origin: '*' } });
  const socketNamespace = io.of('/socket');
  socketNamespace.on('connection', socket => {
    const { id } = socket;
    logger.info(`socket.io: User connected: ${id}`);

    socket.on('disconnect', () => {
      logger.info(`socket.io: User disconnected: ${id}`);
    });
  });

  const newsCollection = connection.collection('news');

  newsCollection.watch().on('change', ({ operationType }) => {
    if (operationType === 'insert') {
      socketNamespace.emit('newThought');
    }
    logger.info('socket.io: Listening news table/document');
  });

  connection.on('error', error => {
    logger.error(`socket.io: Error with websocket ${error}`);
  });
};

module.exports = initializeSocket;