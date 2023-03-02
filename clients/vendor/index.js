'use strict';

const { io } = require('socket.io-client');
let Chance = require('chance');

const socket = io('http://localhost:3001/caps');
let chance = new Chance();

let createPackage = () => {
  let payload = {
    orderId: chance.guid(),
    store:'1-800-flowers',
    customer: chance.name(),
    address: chance.address(),
  };
  console.log('VENDOR: order ready for pickup.');
  socket.emit('PICKUP', payload);
};

socket.on('DELIVERY',(payload)=>{
  setTimeout(() => {
    console.log(`thank you for shopping with us, ${payload.customer}`);
  }, 2000);
});


setInterval(() => {
  createPackage();
}, 10000);

