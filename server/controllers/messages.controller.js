const models = require('../models');
const Message = models.Message;
const Channel = models.Channel;

module.exports.create = async (ctx, next) => {
  if ('POST' != ctx.method) return await next();

  if (!ctx.request.body.message) throw new Error('Message not found');
  if (!ctx.request.body.channel) throw new Error('Channel not defined');

  const checkChannel = await Channel.findOne({where: {name: ctx.request.body.channel}});
  if (!checkChannel) throw new Error('Channel not found');

  const message = {
    message: ctx.request.body.message,
    channel: ctx.request.body.channel,
    creator: ctx.user.username,
  };

  const dbResponse = await Message.create(message);
  // if (dbResponse)
  ctx.body = dbResponse;
};

module.exports.getAll = async (ctx, next) => {
  if ('GET' != ctx.method) return await next();

  const query = ctx.query;
  if (!ctx.query.channel) throw new Error('Channel not specified');
  const checkChannel = await Channel.findOne({where: {name: ctx.query.channel}});
  if (!checkChannel) throw new Error('Channel not found');

  const messages = await Message.findAll({where: {channel: ctx.query.channel},
    order: [['updatedAt', 'DESC']] });
  ctx.body = {
    channel: ctx.query.channel,
    messages
  };
};
