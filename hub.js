"use strict";
// system
let eventPool = require("./eventPool");

const { pickedup, inTransit, delivered } = require("./driver");
const { createPackage, confirmOrder } = require("./vendor");
const logger = require("./logger");


//------------listen to all events------------//

//As a vendor, I want to alert the system when I have a package to be picked up.
eventPool.on("PICKUP_PACKAGE", pickedup);
//eventPool.on("PICKUP_PACKAGE",(payload)=> logger("PICKUP_PACKAGE", payload) );

//As a driver, I want to be notified when there is a package to be delivered.
eventPool.on("PACKAGE_RECEIVED", inTransit);

//As a driver, I want to alert the system when I have picked up a package and it is in transit.
eventPool.on("IN_TRANSIT", delivered);

//As a driver, I want to alert the system and vendor when a package has been delivered.
eventPool.on("DELIVERED", confirmOrder);





setInterval(() => {
  createPackage();
}, 10000);

