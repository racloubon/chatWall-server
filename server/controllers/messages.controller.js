const models = require('../models');
const Message = models.Message;

module.exports.create = async (ctx, next) => {
  if ('POST' != ctx.method) return await next();

  if (!ctx.request.body.message) throw new Error('Message not found');

};
