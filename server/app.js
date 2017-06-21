const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

io.on('connection', function (socket) {
  socket.on('change', (num) => {
    io.emit('change', num);
  });
  socket.on('full', (full) => {
    io.emit('full', full);
  });
});

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'script.js'));
});

module.exports = http;