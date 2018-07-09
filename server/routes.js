'use strict';

const authMiddleware = require('./middlewares/authorization');

const UsersController = require('./controllers/users.controller');
const ChannelsController = require('./controllers/channels.controller');
const MessagesController = require('./controllers/messages.controller');

const router = require('koa-router')();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello People';
});
router.post('/users', UsersController.create);
router.get('/users', UsersController.getAll);
router.get('/sign-in', UsersController.signIn);

router.post('/channels', authMiddleware, ChannelsController.create);
router.post('/messages', authMiddleware, MessagesController.create);
router.get('/messages', authMiddleware, MessagesController.getAll);

module.exports = router;
