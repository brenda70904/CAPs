'use strict';

const {io} = require('socket.io-client');
const socket = io('http://localhost:3001/amazon');
const thankyou = require('./handler');

let Chance = require('chance');
let chance = new Chance();

let createPackage = (store = chance.word({ syllables: 1 })) => {
  let payload = {
    orderId: chance.guid(),
    store:`${store}'s store`,
    customer: chance.name(),
    address: chance.address(),
  };
  socket.emit('PICKUP_PACKAGE', payload);
};

const confirmOrder = (payload) => {
  setTimeout(() => {
    thankyou(payload);
    // console.log(`thank you for shopping with us, ${payload.customer}`);
  }, 2000);
};


setInterval(() => {
  createPackage();
}, 10000);

module.exports =  confirmOrder;
