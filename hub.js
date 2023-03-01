'use strict';
// system

require('dotenv').config();
const { Server } = require('socket.io');
const server = new Server();

// const { pickedup, inTransit, delivered } = require('./driver');
// const  confirmOrder  = require('./vendor');
// const logger = require('./logger');

const caps = server.of('/caps');

server.on('connection', (socket) => {
  console.log('socket connected to Event Server', socket.id);
});


caps.on('connection', (socket) => {
  console.log('Socket connected to caps namespace', socket.id);

  socket.on('PICKUP_PACKAGE', (payload) => {
    console.log('pick up event');
    socket.broadcast.emit('PICKUP_PACKAGE', payload);
  });
  // socket.on('PACKAGE_RECEIVED', inTransit);
  // socket.on('IN_TRANSIT', delivered);
  // socket.on('DELIVERED', confirmOrder);

  // socket.on('JOIN', (roomName) => {
  //   console.log('these are the rooms', socket.rooms);
  //   console.log('payload is the room', payload);
  //   socket.join(roomName);
  //   console.log(`you've joined the ${room} room.`);
  //   console.log('these are the rooms', socket.rooms);

  // });

});
//------------listen to all events------------//

//As a vendor, I want to alert the system when I have a package to be picked up.
//eventPool.on('PICKUP_PACKAGE',(payload)=> logger('PICKUP_PACKAGE', payload) );

//As a driver, I want to be notified when there is a package to be delivered.

//As a driver, I want to alert the system when I have picked up a package and it is in transit.

//As a driver, I want to alert the system and vendor when a package has been delivered.

server.listen(process.env.PORT);