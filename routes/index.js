const routers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const usersRouters = require('./users');
const articlesRouters = require('./articles');
const notFoundRouter = require('./notFoundHandler');
const {
  createUser,
  login,
} = require('../controllers/users');

routers.post('/signup', celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required()
        .trim()
        .min(4),
      name: Joi
        .string()
        .required()
        .trim()
        .min(2)
        .max(30),
    }),
}), createUser);

routers.post('/signin', celebrate({
  body: Joi
    .object()
    .keys({
      email: Joi
        .string()
        .required()
        .email(),
      password: Joi
        .string()
        .required(),
    }),
}), login);

routers.use(auth);

routers.use('/', usersRouters);
routers.use('/', articlesRouters);
routers.use('/', notFoundRouter);

module.exports = routers;
