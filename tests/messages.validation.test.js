test('placeholder', async () => {
  expect(true).toBeTruthy()
})
//
// test('it should not create a message if message is missing', async () => {
//
//   const ctx = {
//     method: 'POST',
//     request: {
//       body: {
//         message: null,
//         pin: 777
//       }
//     },
//     user: {
//       username: "Rachel"
//     },
//     status: null
//   }
//
//   await expect(cntrl.create(ctx, () => {}, model.channels))
//     .rejects.toThrow(Error('Message not found'))
//
//   expect(ctx.status).toBe(400)
//
// })
//
// test('it should not create a message if channel is missing', async () => {
//
//   const ctx = {
//     method: 'POST',
//     request: {
//       body: {
//         message: "Where is my porridge",
//         pin: null
//       }
//     },
//     user: {
//       username: "Rachel"
//     },
//     status: null
//   }
//
//   await expect(cntrl.create(ctx, () => {}, model.channels))
//     .rejects.toThrow(Error('Channel not found'))
//
//   expect(ctx.status).toBe(400)
//
// })
//
// test('it should not create a message if username is missing', async () => {
//
//   const ctx = {
//     method: 'POST',
//     request: {
//       body: {
//         message: "Where is my porridge",
//         pin: 777
//       }
//     },
//     user: {
//       username: null
//     },
//     status: null
//   }
//
//   await expect(cntrl.create(ctx, () => {}, model.channels))
//     .rejects.toThrow(Error('Username not found'))
//
//   expect(ctx.status).toBe(400)
//
// })
