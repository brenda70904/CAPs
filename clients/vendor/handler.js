'use strict';

const Chance = require('chance');
const chance = new Chance();

const vendor = '1-800-flowers';
let createPackage = (socket, order = null) => {
  if (!order) {
    order = {
      vendor,
      id: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  let payload = {
    event: 'PICKUP',
    messageId: order.id,
    queueId: vendor,
    order,
  };
  console.log('VENDOR: order ready for pickup.');
  socket.emit('PICKUP', payload);
};

const thankDriver = (payload) => {
  console.log(`FLOWERS: thanks for delivery the package to ${payload.order.customer} `);
};

module.exports = { createPackage, thankDriver };
