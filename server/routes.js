'use strict';

// const authMiddleware = require('./middlewares/authorization');
//
// const UsersController = require('./controllers/users.controller');
// const MoviesController = require('./controllers/movies.controller');

const router = require('koa-router')();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello People';
});
// router.get('/search', MoviesController.search);
// router.get('/categories', MoviesController.categories);
// router.get('/categories/:category', MoviesController.listByCategory);
// router.get('/movie/:id', MoviesController.show);
// router.post('/movie/:movie_id/review', authMiddleware, MoviesController.review);
//
// router.get('/recommendations', authMiddleware, UsersController.recommendations);
// router.get('/me', authMiddleware, UsersController.me);
// router.get('/me/reviews', authMiddleware, UsersController.myReviews);
// router.post('/users', UsersController.create);
// router.get('/sign-in', UsersController.signIn);

module.exports = router;
