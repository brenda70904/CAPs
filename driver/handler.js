"use strict";

const logger = require("../logger");
const eventPool = require("../eventPool");

module.exports = (message, payload) =>{
  eventPool.emit(message, payload);
    console.log(`${message}:${payload.orderId}`);
    logger(message, payload);
}

