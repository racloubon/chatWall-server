'use strict';
// const dotenv = require('dotenv').config();
const compress = require('koa-compress');
const logger = require('koa-logger');
// const serve = require('koa-static');
const koa = require('koa');
const cors = require('kcors');
// const path = require('path');
const bodyParser = require('koa-bodyparser');

const app = module.exports = new koa();

const router = require('./routes.js');
const errorHandler = require('./middlewares/error-handler');


app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods())
  .use(compress());

// eslint-disable-next-line
// console.log('=====>>>>> process.env.TMDB_API_KEY:',process.env.TMDB_API_KEY);
// console.log(process.env);

const port = process.env.PORT || 3000;

app.listen(port,() => {
  // eslint-disable-next-line
  console.log('Koa Server listening to port:', port);
});
