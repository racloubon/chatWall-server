const models = require('../models');
const Channel = models.Channel;

module.exports.create = async (ctx, next, Channel = models.Channel) => {
  if ('POST' != ctx.method) return await next();

  // if (!ctx.request.body.channel) {
  //   ctx.status = 400;
  //   throw new Error('Channel name not found');
  // };
  // if (!ctx.user.username) {
  //   ctx.status = 400;
  //   throw new Error('Username not found');
  // };

  let channel = await Channel.findOne({where: {name: ctx.request.body.channel}});

  if (channel) throw Error('Channel already exists');
  else {
    channel = {
      name: ctx.request.body.channel,
      creator: ctx.user.username,
      // TODO: modify the date to internal db format, modify the model too
      expireTime: Date()
    };
    const createdChannel = await Channel.create(channel);

    ctx.status = 201;
    ctx.body = {
      username: ctx.user.username,
      channel: ctx.request.body.channel,
    };
  }
};
