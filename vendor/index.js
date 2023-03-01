'use strict';

const { io } = require('socket.io-client');
let Chance = require('chance');

const socket = io('http://localhost:3001/caps');
let chance = new Chance();
// const thankyou = require('./handler');

// socket.on('connection', (store = chance.word({ syllables: 1 })) => {
//   let payload = {
//     orderId: chance.guid(),
//     store: `${store}'s store`,
//     customer: chance.name(),
//     address: chance.address(),
//   };
//   socket.emit('PICKUP_PACKAGE', payload);
// });

let createPackage = () => {
  let payload = {
    orderId: chance.guid(),
    store:'1-800-flowers',
    customer: chance.name(),
    address: chance.address(),
  };
  console.log('VENDOR: order ready for pickup.');
  socket.emit('PICKUP_PACKAGE', payload);
};

socket.on('NOTE',(payload)=>{
  setTimeout(() => {
    console.log(`thank you for shopping with us, ${payload.customer}`);
  }, 2000);
});

// const confirmOrder = (payload) => {
//   setTimeout(() => {
//     // thankyou(payload);
//     console.log(`thank you for shopping with us, ${payload.customer}`);
//   }, 2000);
// };


setInterval(() => {
  createPackage();
}, 10000);

// module.exports = confirmOrder;
