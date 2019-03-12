
const channelRequestValidation = async (ctx, next) => {

  if (ctx.method === 'POST') {
    const { channel } = ctx.request.body;
    console.log(channel, "🐵")
    if (!channel) throw Error('Channel must have a name!');
    if (channel.length < 5) throw Error('Channel name is too short. Min 5 characters');
    if (channel.length > 100) throw Error('Channel name too long. Max 100 characters');
    try {
      await next();
    }
    catch (err) {
      ctx.status = 503;
      return;
    }
  }
}

module.exports = channelRequestValidation;
