'use strict';
require('dotenv').config();
const compress = require('koa-compress');
const logger = require('koa-logger');
const koa = require('koa');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');
const app = module.exports = new koa();
const router = require('./routes.js');
const errorHandler = require('./middlewares/error-handler');
const models = require('./models');

app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(compress());

const port = process.env.PORT || 3000;

models.sequelize.sync().then(function () {
  /**
   * Listen on provided port, on all network interfaces.
   */
  app.listen(port, function () {
    //eslint-disable-next-line
    console.log('Koa app listening on port:', port);
  });
});
