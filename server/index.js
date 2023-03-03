'use strict';
// system

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const server = new Server();
const Queue = require('./library/queue');
const capsQueue = new Queue();

//create a namespace
const caps = server.of('/caps');

//create and allow for connections
caps.on('connection', (socket) => {
  console.log('Socket connected to the caps namespace', socket.id);
  socket.onAny((event, payload) => {
    const time = new Date();
    console.log('EVENT', { event, time, payload });
  });

  socket.on('JOIN', (room) => {
    socket.join(room);
    console.log(`id:${socket.id} joined the ${room} room`);
    console.log(`these are the rooms: ${socket.adapter.rooms}`);

  });
  //manage the PICKUP event
  socket.on('PICKUP', (payload) => {
    let driverQueue = capsQueue.read('driver');
    if (!driverQueue) {
      let driverKey = capsQueue.store('driver', new Queue());
      driverQueue = capsQueue.read(driverKey);
    }
    driverQueue.store(payload.messageId, payload);
    //this is the switchboard
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN_TRANSIT', (payload) => {
    console.log('DRIVER: package is on the way');
    socket.broadcast.emit('IN_TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let vendorQueue = capsQueue.read(payload.queueId);
    if (!vendorQueue) {
      let vendorKey = capsQueue.store(payload.queueId, new Queue());
      vendorQueue = capsQueue.read(vendorKey);
    }
    vendorQueue.store(payload.messageId, payload);
    socket.to(payload.queueId).emit('DELIVERY', payload);
  });
  // socket.on('DELIVERY', (payload) => {

  //   socket.to(payload.queueId).emit('DELIVERY', payload);

  // });
  socket.on('RECEIVED', (payload) => {
    console.log('Server: Received event registered');
    let currentQueue = capsQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error('we have payloads but no queue');
    }
    currentQueue.remove(payload.messageId);
  });

  socket.on('GET-ALL', (payload) => {
    console.log('get all');
    let currentQueue = capsQueue.read(payload.queueId);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(messageId => {
        let payload = currentQueue.read(messageId);
        socket.emit(payload.event, payload);
      });
    }
  });

});

console.log(`port listening on ${PORT}`);
server.listen(PORT);