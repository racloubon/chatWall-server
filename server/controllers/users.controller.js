const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config({path:__dirname+'/./../../.env'});

const jwt_secret = process.env.JWT_SECRET;

module.exports.signIn = async (ctx, next) => {
  if ('GET' != ctx.method) return await next();

  const authHeader = ctx.headers.authorization;
  if (!authHeader) throw new Error('No authorization header');

  const userColonPassword = atob(authHeader.split('Basic ')[1]);
  const [username, password] = userColonPassword.split(':');

  if (!username || !password) throw new Error('Bad Credentials');

  const user = await models.User.findOne({where: {username: username}});
  if (!user) throw new Error('Bad user or password');
  const match = await bcrypt.compare(password, user.password);

  if (!user || !match) {
    ctx.status = 401;
    return;
  } else {
    ctx.status = 200;
    const token = jwt.sign({username: username}, jwt_secret);
    ctx.body = {
      jwt_token: token,
      username
    };
  }
};

module.exports.create = async (ctx, next) => {
  if ('POST' != ctx.method) return await next();

  const userData = ctx.request.body;

  let user = await models.User.findOne({where: {username: userData.username}});

  if (user) {
    ctx.status = 400;
    ctx.body = {
      errors: [
        'Username already exists.'
      ]
    };
  } else {
    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    user = {
      username: userData.username,
      password: encryptedPassword,
      email: userData.email
    };
    const createdUser = await models.User.create(user);
    const token = jwt.sign({username: user.username}, jwt_secret);
    ctx.body = {
      username: user.username,
      jwt_token: token
    };
    ctx.status = 201;
  }
};

module.exports.getAll = async (ctx, next) => {
  if ('GET' != ctx.method) return await next();

  ctx.body = await models.User.findAll();
};
