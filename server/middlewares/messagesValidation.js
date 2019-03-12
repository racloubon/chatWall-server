const xss = require('xss');

const messagesValidation = async (ctx, next) => {

  const { message } = ctx.request.body;

  const sanitizedMessage = xss(message, {
    whiteList: [],
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
  })

  ctx.request.body.message = sanitizedMessage;

  await next();

}

module.exports = messagesValidation;
