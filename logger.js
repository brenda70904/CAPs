"use strict";

const logger = (event, payload) => {
  let date = Date.now();
  let timeStemp = new Date(date).toUTCString();
  console.log("EVENT", { event, timeStemp, payload })
  // `EVENT: {\n
  //   event: "${str}",\n
  //   time: "${timeStemp}",\n
  //   payload: {\n
  //       store: "${payload.store}", \n
  //       orderId: "${payload.orderId}", \n
  //       customer: "${payload.customer}", \n
  //       address: "${payload.address}", \n
  //   },
  //}`);
};

module.exports = logger;