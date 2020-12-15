const router = require('express').Router();
/* const { celebrate, Joi } = require('celebrate'); */
/* const urlValidation = require('../validator/validator'); */
const {
  getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

/* router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().max(30),
  }),
}), setUserInfo);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidation),
  }),
}), setUserAvatar);
router.get('/users', getUsers); */

module.exports = router;
