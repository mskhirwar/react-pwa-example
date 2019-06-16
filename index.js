/**
 * index.js
 */

import express from 'express';
import http from 'http';

// Express app setup
const app = express();

// Create app router
app.get('*', (req, res) => {
  res.end('Hello Express');
});

// Create server
const server = http.createServer(app);
server.listen(3000);
server.on('listening', () => {
  console.log('Server is listening on port: 3000');
});
