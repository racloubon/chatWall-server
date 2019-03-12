const cntrl = require('../server/controllers/channels.controller');
const model = require('./models');

test('it should create a channel and return a pin', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        channel: "Monkeys"
      }
    },
    user: {
      username: "Coconut"
    },
    body: {
      pin: null
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, model.channels)

  expect(ctx.body.pin).toBe(
    999
  );
  expect(ctx.status).toBe(
    201
  );

})

test('it should handle the error if the database fails', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        channel: "Monkeys"
      }
    },
    user: {
      username: "Coconut"
    },
    body: {
      pin: null
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, null)

  expect(ctx.status).toBe(
    500
  );

})
