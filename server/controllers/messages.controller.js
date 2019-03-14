const models = require('../models');
const { Op } = require('sequelize');

module.exports.create = async (ctx, next, Message = models.Message) => {

  const { message, pin: channel_id } = ctx.request.body;
  const { username: creator } = ctx.user;

  try {
    const messages = await Message.create({ message, creator, channel_id });
    ctx.body = messages;
    ctx.status = 201;
  } catch (err) {
    ctx.status = 503;
  }
};

module.exports.getMessages = async (ctx, next, Message = models.Message) => {

  const { pin, cutoff } = ctx.query;

  try {
    const messages = cutoff ? await Message.findAll({
      where: {
        channel_id: pin,
        createdAt: {
          // [Op.lt]: new Date(cutoff)
          [Op.lt]: Date(cutoff)
        }
      }
    }) : await Message.findAll({
      where: {
        channel_id: pin,
      }
    })
    ctx.body = messages
    ctx.status = 201;
  } catch (err) {
    ctx.status = 503;
  }
};

module.exports.voteMessage = async (ctx, next, Message = models.Message) => {

  const { id, vote } = ctx.request.body;
  const v = vote === 1 ? '+' : '-';

  try {
    const message = await Message.update({ score: models.sequelize.literal(`"score" ${v} 1`) }, { where: { id: id }, returning: true, plain: true });
    ctx.body = message[1].dataValues;
    ctx.status = 200;
  }
  catch (err) {
    ctx.status = 400;
  }

}


//90b28a