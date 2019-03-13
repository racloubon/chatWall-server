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

  const jwt_token = jwt.sign({ username }, jwt_secret);

  try {
    const user = await User.findOne({ where: { username } });
    await bcrypt.compare(password, user.password);
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
