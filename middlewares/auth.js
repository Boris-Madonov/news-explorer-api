const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { unauthorizedError } = require('../errors/errors');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  try {
    if (!authorization && !authorization.startsWith('Bearer ')) {
      return next(unauthorizedError('Необходима авторизация'));
    }

    const token = await authorization.replace('Bearer ', '');

    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    next(unauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;