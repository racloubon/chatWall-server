const cntrl = require('../server/controllers/messages.controller');
const model = require('./models');

//CREATE

test('it should create a message', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        message: "My porridge has been eaten.",
        pin: 777
      }
    },
    user: {
      username: "Rachel"
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, model.messages)

  expect(ctx.status).toBe(
    201
  );

})

test('it should handle the error if the database fails', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        message: "My porridge has been eaten.",
        pin: 777
      }
    },
    user: {
      username: "Rachel"
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, null)

  expect(ctx.status).toBe(
    500//
  );

})

//GET ALL

test('it should fetch all messages', async () => {

  const ctx = {
    method: 'GET',
    query: {
      pin: 999
    },
    body: {
      messages: null
    },
    status: null
  }

  await cntrl.getMessages(ctx, () => {}, model.messages)
  expect(ctx.body.messages).toEqual([{
    score: 0,
    expireTime: 'Sat Mar 09 2019 14:33:09 GMT+0100 (Central European Standard Time)',
    message: "Stripes or spots",
    channel: 'Tigers',
    pin: 999,
    creator: 'Tony',
    updatedAt: "2019-03-09T09:07:27.635Z",
    createdAt: "2019-03-09T09:07:27.635Z"
  }]);

})
