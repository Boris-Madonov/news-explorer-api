const { notFoundError } = require('../errors/errors');

const notFoundHandler = (req, res, next) => {
  next(notFoundError('Запрашиваемый ресурс не найден'));
};

module.exports = notFoundHandler;
