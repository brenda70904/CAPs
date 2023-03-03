'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const { createPackage, thankDriver } = require('./handler');
let vendor = '1-800-flowers';

socket.emit('JOIN', vendor);
socket.emit('GET-ALL', { queueId: vendor });

socket.on('DELIVERED', (payload) => {
  setTimeout(() => {
    thankDriver(payload);
    socket.emit('RECEIVED', payload);
  }, 2000);
});


setInterval(() => {
  createPackage(socket);
}, 10000);
