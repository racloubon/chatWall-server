'use strict';

const authMiddleware = require('./middlewares/authorization');

const UsersController = require('./controllers/users.controller');
const ChannelsController = require('./controllers/channels.controller');
const MessagesController = require('./controllers/messages.controller');

const channelRequestValidation = require('./middlewares/channelsValidation');
const messagesValidation = require('./middlewares/messagesValidation');

const router = require('koa-router')();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello People';
});
router.post('/users', UsersController.create);
router.get('/sign-in', UsersController.signIn);

router.post('/channels', authMiddleware, channelRequestValidation, ChannelsController.create);
router.post('/messages', authMiddleware, messagesValidation, MessagesController.create);
router.get('/messages', authMiddleware, MessagesController.getMessages);
router.put('/messages', authMiddleware, MessagesController.voteMessage);

module.exports = router;
