const cntrl = require('../server/controllers/channels.controller');
const model = require('./models');

test('it should create a channel', async () => {

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


test('it should not create a channel if channel data is not provided', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        channel: null,
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

  await expect(cntrl.create(ctx, () => {}, model.channels))
    .rejects.toThrow(Error('Channel name not found'))

  expect(ctx.status).toBe(400)
})

test('it should not create a channel if username data is not provided', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        channel: "Monkeys"
      }
    },
    user: {
      username: null
    },
    body: {
      pin: null
    },
    status: null
  }

  await expect(cntrl.create(ctx, () => {}, model.channels))
    .rejects.toThrow(Error('Username not found'))

  expect(ctx.status).toBe(400)
})

test('it should delete a channel', async () => {

  const ctx = {
    method: 'DELETE',
    request: {
      body: {
        pin: 888
      }
    },
    user: {
      username: "Egill"
    },
    status: null
  }

  await cntrl.delete(ctx, () => {}, model.channels)

  expect(ctx.status).toBe(202)
})
