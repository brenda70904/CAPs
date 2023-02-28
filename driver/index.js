"use strict";

const eventPool = require("../eventPool");
const handler = require ("./handler");

const pickedup = (payload) => {
  setTimeout(() => {
    handler("PACKAGE_RECEIVED",payload);
    // eventPool.emit("PACKAGE_PICKUPED", payload);
    // console.log(`package picked up:${payload.orderId}`);
    // logger(payload,"PickedUp");
  }, 2000);
};

const inTransit = (payload) => {
  setTimeout(() => {
    handler("IN_TRANSIT", payload);
    // eventPool.emit("IN_TRANSIT", payload);
    // console.log(`DRIVER: in-transit: ${payload.orderId}`);
    // logger(payload,"in transit");
  }, 2000);
};

const delivered = (payload) => {
  setTimeout(() => {
    handler("DELIVERED",payload);
    // eventPool.emit("DELIVERED", payload);
    // console.log(`DRIVER: delivered ${payload.orderId}`);
    // logger(payload,"delivered");
  },3000);
}


module.exports = {
  pickedup,
  inTransit,
  delivered
}