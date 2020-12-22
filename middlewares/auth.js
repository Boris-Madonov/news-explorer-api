const jwt = require('jsonwebtoken');
const { JWTKey } = require('../utils/config');
const { unauthorizedError } = require('../errors/errors');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  let payload;

  try {
    if (!authorization && !authorization.startsWith('Bearer ')) {
      return next(unauthorizedError('Необходима авторизация'));
    }

    const token = await authorization.replace('Bearer ', '');

    payload = jwt.verify(token, JWTKey);
  } catch (error) {
    next(unauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
