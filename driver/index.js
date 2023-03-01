'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

socket.on('PACKAGE_PICKEDUP',(payload)=>{
  setTimeout(() => {
    console.log('DRIVER: package picked up');
    socket.emit('IN_TRANSIT',payload);
  }, 2000);
});

socket.on('DELIVERY',(payload)=>{
  setTimeout(() => {
    console.log('package has been delivered.');
    socket.emit('DELIVERED',payload);
  }, 3000);
});
