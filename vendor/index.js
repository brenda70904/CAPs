"use strict";

const eventPool = require("../eventPool");
const thankyou = require("./handler");

let Chance = require("chance");
let chance = new Chance();

let createPackage = (store = chance.word({ syllables: 1 })) => {
  let payload = {
    orderId: chance.guid(),
    store:`${store}'s store`,
    customer: chance.name(),
    address: chance.address()
  }
  eventPool.emit("PICKUP_PACKAGE", payload);
};

const confirmOrder = (payload) => {
  setTimeout(() => {
    thankyou(payload);
    // console.log(`thank you for shopping with us, ${payload.customer}`);
  }, 2000);
}

module.exports = { createPackage, confirmOrder };
