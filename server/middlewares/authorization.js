const jwt = require('jsonwebtoken');
const validate = require('validator');
require('dotenv').config({path:__dirname+'/./../../.env'});

const jwt_secret = process.env.JWT_SECRET;

const authorize = async (ctx, next) => {
  const { authorization: authHeader } = ctx.headers;

  const jwt_token = authHeader.substring(7);

  if (!validate.isJWT(jwt_token)) throw Error('Auth header not a valid jwt');

  try {
    ctx.user = { username } = jwt.verify(jwt_token, jwt_secret)
    await next();
  }
  catch (err) {
    ctx.status = 401;
    ctx.body = err.message;
  }

};


module.exports = authorize;
