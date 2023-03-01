'use strict';

const logger = require('../logger');
const amazon = require('../hub');


module.exports = (message, payload) => {
  amazon.emit(message, payload);
  console.log(`${message}:${payload.orderId}`);
  logger(message, payload);
};

