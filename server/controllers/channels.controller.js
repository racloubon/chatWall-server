const models = require('../models');
const ids = require('short-id');
const validate = require('validator');

module.exports.create = async (ctx, next, Channel = models.Channel) => {

  const { channel: name } = ctx.request.body;
  const { username: creator } = ctx.user;

  if (!validate.isLength(name, { min: 5, max: 100 })) throw Error('Channel too short/long. Min: 5 Max: 100');

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
