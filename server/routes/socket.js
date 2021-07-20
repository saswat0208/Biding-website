/* eslint-disable no-console */
/* eslint-disable object-curly-spacing */
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */


const io = require('socket.io')(4000, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
// const users = {};

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('user-joined', (name) => {
    socket.broadcast.emit('user', name);
  });
});
