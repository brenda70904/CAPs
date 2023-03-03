'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

socket.emit('GET-ALL', { queueId: 'driver' });

socket.on('PICKUP', (payload) => {
  setTimeout(() => {
    console.log('DRIVER: package picked up');
    socket.emit('IN_TRANSIT', payload);
    socket.emit('RECEIVED', { queueId: 'driver', messageId: payload.messageId });
  }, 2000);
  setTimeout(() => {
    console.log('package has been delivered.');
    socket.emit('DELIVERED', { ...payload, event: 'DELIVERED' });
  }, 3000);
});

