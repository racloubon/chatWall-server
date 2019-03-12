const models = require('../models');
const ids = require('short-id');

module.exports.create = async (ctx, next, Channel = models.Channel) => {

  const { channel: name } = ctx.request.body;
  const { username: creator } = ctx.user;
  const pin = ids.generate();

  try {
    const channel = await Channel.create({ name, creator, pin });
    ctx.body = channel;
    ctx.status = 201;
  }
  catch (err) {
    ctx.status = 503;
  }

};
