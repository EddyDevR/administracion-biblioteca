#!/usr/bin/env node

// Module dependencies.
// Importing the server logic
// require is used to import code from an external file
// Importing an external dependecy
// Module that allows to communicate with a client
// usign HTTP protocol
import http from 'http';

// Impornting winston logger
import log from '../config/winston';

// Importing config Keys
import configKeys from '../config/configKeys';

// Importing ODM
import MongooseOdm from '../services/odm';

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Get port from environment and store in Express.
const port = normalizePort(configKeys.port);

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Rutina de arranque del servidor
function startServer(dbConnection) {
  import('../app').then((module) => {
    // Importa el modulo por defecto
    const app = module.default;
    // Store the port info in the app
    app.set('port', port);

    // Create HTTP server.
    log.info('The server is created from the express instance');
    const server = http.createServer(app); // (req, res) => { acciones }

    // Event listener for HTTP server "listening" event.
    function onListening() {
      const addr = server.address();
      log.info(`⭐⭐ Listening on ${process.env.APP_URL}:${addr.port} ⭐⭐`);
    }

    // Attaching Callbacks to events
    server.on('error', onError);
    server.on('listening', onListening);
    // Store the dbConnection in the app
    app.set('dbConnection', dbConnection);
    // Starting Server
    server.listen(port);
  });
}

// IIFE
(async () => {
  // Creando la instancia del ODM
  const mongooseOdm = new MongooseOdm(configKeys.mongoUrl);
  // Conectando a la base de datos
  try {
    const dbConnection = await mongooseOdm.connect();
    if (dbConnection) {
      log.info(
        `🛢️ Conexión exitosa a la base de datos: ${configKeys.mongoUrl} 🛢️`,
      );
      startServer(dbConnection);
    }
  } catch (error) {
    log.error(`Error www.js ln 103: ${error.message}`);
  }
})();
