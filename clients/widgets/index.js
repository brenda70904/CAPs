'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const { order, ThankDriver } = require('./handler');

socket.emit('JOIN', 'acme-widgets');
socket.emit('GET-ALL','acme-widgets');

socket.on('DELIVERY',(payload)=>{
  ThankDriver(payload);
  socket.emit('RECEIVED',payload);
});

setInterval(() => {
  order(socket);
}, 10000);


