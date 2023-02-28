"use strict";

const eventPool = require("../eventPool");
const driver = require("./index");

// jest.mock("../eventPool", () => {
//   return {

//     on: jest.fn(),
//     emit: jest.fn()
//   };
// });
console.log = jest.fn();
eventPool.emit = jest.fn();

describe("test driver", () => {
  it("emit PACKAGE_PICKUPED", () => {
    let payload = {orderId: 112}
    driver.pickedup(payload);
    expect(console.log).toHaveBeenCalledWith(`package picked up:${payload.orderId}`);
    
  });
})