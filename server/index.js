/**
 * Module dependencies
 */

import http from 'http';
// import path from 'path';
// import fs from 'fs';
// import https from 'https';
import app from '../app';

// const privateKey = fs.readFileSync(path.join(__dirname, 'sslcert/development.key'), 'utf8');
// const certificate = fs.readFileSync(path.join(__dirname, 'sslcert/development.crt'), 'utf8');

// const credentials = { key: privateKey, cert: certificate };
// Simple logger function
const log = (message) => {
  process.stdout.write(`${message}\n`);
};

// Normalize a port into a number, string or false
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    console.log(val)
    return val;
  }

  if (port >= 0) {
    // port number
    return val;
  }

  return false;
};

// Get port from environment and store in express
const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);
let availablePort = port;

// Listen on provide port, on all network interfaces
const startServer = (serverPort) => {
  server.listen(serverPort);
};

// Event listener for HTTP server "error" event
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `${
    typeof port === 'string' ? 'Pipe' : 'Port'
  } ${port}`;

  // handle specific listen errors with friendly messages
  switch (error) {
    case 'EACCESS':
      log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      if (availablePort - port < 10) {
        availablePort += 1;
        startServer(availablePort);
      } else {
        log(`${bind} is already in use`);
        process.exit(1);
      }
      break;
    default:
      throw error;
  }
};

// Event listener for HTTP server "listening" event
const onListening = () => {
  const addr = server.address();
  const bind = `${
    typeof addr === 'string' ? 'pipe' : 'port'
  } ${
    typeof addr === 'string' ? addr : addr.port
  }`;

  log(`Server is listening on ${bind}`);
  log(`Visit: http://localhost:${addr.port}`);
};

// Start server
server.on('error', onError);
server.on('listening', onListening);

startServer(availablePort);
