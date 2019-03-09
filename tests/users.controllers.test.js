const cntrl = require('../server/controllers/users.controller');
const model = require('./models');


//create - sign up

test('it should create a user', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        username: "Igor",
        email: 'igor@chatwall.com',
        password: 'password'
      }
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, model.users)

  expect(ctx.status).toBe(
    201
  );

})

test('it should not create a user if username already exists', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        username: "Rachel",
        email: 'igor@chatwall.com',
        password: 'password'
      }
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, model.users)

  await expect(cntrl.create(ctx, () => {}, model.channels))
    .rejects.toThrow(Error('Username already exists'))

  expect(ctx.status).toBe(409)

})

test('it should not create a user if email is already registered', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        username: "RachelAgain",
        email: 'rachel@chatwall.com',
        password: 'password'
      }
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, model.users)

  await expect(cntrl.create(ctx, () => {}, model.channels))
    .rejects.toThrow(Error('Email already registered'))

  expect(ctx.status).toBe(409)

})

test('it should not create a user if username is not provided', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        username: null,
        email: 'igor@chatwall.com',
        password: 'password'
      }
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, model.users)

  await expect(cntrl.create(ctx, () => {}, model.channels))
    .rejects.toThrow(Error('Username not provided'))

  expect(ctx.status).toBe(400)

})

test('it should not create a user if email address is not provided', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        username: "Igor",
        email: null,
        password: 'password'
      }
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, model.users)

  await expect(cntrl.create(ctx, () => {}, model.channels))
    .rejects.toThrow(Error('Email not provided'))

  expect(ctx.status).toBe(400)

})

test('it should not create a user if password is not provided', async () => {

  const ctx = {
    method: 'POST',
    request: {
      body: {
        username: "Igor",
        email: "igor@chatwall.com"
        password: null
      }
    },
    status: null
  }

  await cntrl.create(ctx, () => {}, model.users)

  await expect(cntrl.create(ctx, () => {}, model.channels))
    .rejects.toThrow(Error('Password not provided'))

  expect(ctx.status).toBe(400)

})


//authorisation - sign in
//to do later
