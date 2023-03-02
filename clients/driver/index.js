'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

socket.on('PICKUP',(payload)=>{
  setTimeout(() => {
    console.log('DRIVER: package picked up');
    socket.emit('IN_TRANSIT',payload);
  }, 2000);
  setTimeout(() => {
    console.log('package has been delivered.');
    socket.emit('DELIVERY',payload);
  }, 3000);
});

