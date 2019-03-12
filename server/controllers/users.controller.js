const bcrypt = require('bcrypt');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config({path:__dirname+'/./../../.env'});
const validate = require('validator');

const jwt_secret = process.env.JWT_SECRET;

module.exports.signIn = async (ctx, next, User = models.User) => {

  const { authorization: authHeader } = ctx.headers;

  if (!authHeader) throw new Error('No authorization header');

  const userColonPassword = atob(authHeader.split('Basic ')[1]);
  const [username, password] = userColonPassword.split(':');

  const jwt_token = jwt.sign({username}, jwt_secret);

  try {
    const usern = await User.findOne({where: {username}});
    const match = await bcrypt.compare(password, user.password);
    ctx.body = { jwt_token, username };
    ctx.status = 200;
  }
  catch (err) {
    ctx.status = 401;
    throw Error('Username or Password incorrect!');
  }

};


module.exports.create = async (ctx, next, User = models.User) => {

  const { username, email, password } = ctx.request.body;

  if (await User.findOne({ where: {username} })) throw Error('Username already in use.');
  if (!validate.isEmail(email)) throw Error('Please enter a valid email');
  if (validate.isLowercase(password)) throw Error('Password must contain min:1 capital case letter');

  const encryptedPassword = await bcrypt.hash(password, 10);
  const jwt_token = jwt.sign({username}, jwt_secret);

  try {
    console.log('here');
    await User.create({ username, email, password: encryptedPassword });
    console.log('here 2')
    ctx.body = { username, jwt_token };
    ctx.status = 201;
  }
  catch (err) {
    ctx.status = 503;
    throw Error('Sign Up failed due to server error. Please try again later');
  }

};







// const bcrypt = require('bcrypt');
// const atob = require('atob');
// const jwt = require('jsonwebtoken');
// const models = require('../models');
// require('dotenv').config({path:__dirname+'/./../../.env'});
//
// const jwt_secret = process.env.JWT_SECRET;
//
// module.exports.signIn = async (ctx, next) => {
//   if ('GET' != ctx.method) return await next();
//
//   const authHeader = ctx.headers.authorization;
//   if (!authHeader) throw new Error('No authorization header');
//
//   const userColonPassword = atob(authHeader.split('Basic ')[1]);
//   const [username, password] = userColonPassword.split(':');
//
//   if (!username || !password) throw new Error('Bad Credentials');
//
//   const user = await models.User.findOne({where: {username: username}});
//   if (!user) throw new Error('Bad user or password');
//   const match = await bcrypt.compare(password, user.password);
//
//   if (!user || !match) {
//     ctx.status = 401;
//     return;
//   } else {
//     ctx.status = 200;
//     const token = jwt.sign({username: username}, jwt_secret);
//     ctx.body = {
//       jwt_token: token,
//       username
//     };
//   }
// };
//
// module.exports.create = async (ctx, next) => {
//   if ('POST' != ctx.method) return await next();
//
//   const userData = ctx.request.body;
//
//   let user = await models.User.findOne({where: {username: userData.username}});
//
//   if (user) {
//     ctx.status = 400;
//     ctx.body = {
//       errors: [
//         'Username already exists.'
//       ]
//     };
//   } else {
//     const encryptedPassword = await bcrypt.hash(userData.password, 10);
//
//     user = {
//       username: userData.username,
//       password: encryptedPassword,
//       email: userData.email
//     };
//     const createdUser = await models.User.create(user);
//     const token = jwt.sign({username: user.username}, jwt_secret);
//     ctx.body = {
//       username: user.username,
//       jwt_token: token
//     };
//     ctx.status = 201;
//   }
// };
//
// module.exports.getAll = async (ctx, next) => {
//   if ('GET' != ctx.method) return await next();
//
//   ctx.body = await models.User.findAll();
// };
