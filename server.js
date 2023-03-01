'use strict';
// system

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const server = new Server();

// const { pickedup, inTransit, delivered } = require('./driver');
// const  confirmOrder  = require('./vendor');
// const logger = require('./logger');

//create a namespace
const caps = server.of('/caps');


//create and allow for connections
caps.on('connection', (socket) => {
  console.log('Socket connected to the caps namespace', socket.id);
  socket.onAny((event, payload) => {
    const time = new Date();
    console.log('EVENT', {event, time, payload});
  });

  //manage the PICKUP event
  socket.on('PICKUP_PACKAGE', (payload) => {
    //this is the switchboard
    socket.broadcast.emit('PACKAGE_PICKEDUP', payload);
  });

  socket.on('IN_TRANSIT',(payload)=>{
    console.log('DRIVER: package is on the way');
    socket.broadcast.emit('DELIVERY',payload);

  });

  socket.on('DELIVERED',(payload)=>{
    socket.emit('NOTE',payload);
  });
});

console.log(`port listening on ${PORT}`);
server.listen(PORT);