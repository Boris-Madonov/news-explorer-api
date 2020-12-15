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

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    return res.send(users);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      throw notFoundError('Нет пользователя с таким id');
    }

    return res.send(user);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return badRequestError('Передан некорректный id');
    }
    return next(error);
  }
};

const setUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      throw notFoundError('Нет пользователя с таким id');
    }
    user.name = req.body.name;
    user.about = req.body.about;

    await user.save();

    return res.send(user);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return badRequestError('Передан некорректный id');
    }
    return next(error);
  }
};

const setUserAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      throw notFoundError('Нет пользователя с таким id');
    }
    user.avatar = req.body.avatar;

    await user.save();

    return res.send(user);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return badRequestError('Передан некорректный id');
    }
    return next(error);
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
        });
      });

    return res.send();
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return badRequestError(error.message);
    }
    return next(error);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((error) => {
      console.log(error);
      return next(unauthorizedError(error.message));
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  setUserInfo,
  setUserAvatar,
  createUser,
  login,
};
