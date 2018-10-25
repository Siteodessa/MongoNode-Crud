import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:8000');
const socket = openSocket('http://192.168.0.128:8000');


function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}


function broadcastMessage(cb, message) {
  socket.on('broadcastMessage', message => cb(null, message));
  socket.emit('broadcastMessage', message);
}

export { subscribeToTimer, socket, broadcastMessage };
