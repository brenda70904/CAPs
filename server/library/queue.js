'use strict';

class Queue {
  constructor() {
    this.data = {};
  }

  store(key, value) {
    this.data[key] = value;
    console.log('added to the queue');
    return key;
  }

  read(key) {
    return this.data[key];
  }

  remove(key) {
    console.log('removed from queue');
    let value = this.data[key];
    //delete from vanilla JS
    delete this.data[key];
    return value;
  }
}

module.exports= Queue;