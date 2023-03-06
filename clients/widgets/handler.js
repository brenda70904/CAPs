'const strict';

const Chance = require('chance');
const chance = new Chance();

const order = (socket, order = null) => {
  if (!order) {
    order = {
      store: 'acme-widgets',
      id: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  let payload = {
    event: 'PICKUP',
    messsageId: order.id,
    queueId: 'acme-widgets',
    order,
  };
  console.log('acme-widgets: order ready for pickup');
  socket.emit('PICKUP', payload);
};

const ThankDriver = (payload) => {
  console.log(`Thanks for delivery the package to ${payload.order.customer}`);
};

module.exports = { order, ThankDriver };