const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  badRequestError,
  unauthorizedError,
  notFoundError,
  conflictError,
} = require('../errors/errors');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      throw notFoundError('Нет пользователя с таким id');
    }

    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'CastError') {
      next(badRequestError('Передан некорректный id'));
    } else {
      next(error);
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await User.findOne({ email: req.body.email });
    if (newUser) {
      throw conflictError('Пользователь с таким email уже существует');
    }
    await bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        User.create({
          email: req.body.email,
          password: hash,
          name: req.body.name,
        });
      });

    res.status(200).send();
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(conflictError('Невалидные данные'));
    } else if (error.name === 'ValidationError') {
      next(badRequestError(error.message));
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    await User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt
          .sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );

        res.status(200).send({ token });
      });
  } catch (error) {
    next(unauthorizedError(error.message));
  }
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
