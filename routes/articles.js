const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidation = require('../validator/validator');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/articles', getArticles);
router.post('/articles', celebrate({
  body: Joi
    .object()
    .keys({
      keyword: Joi
        .string()
        .required()
        .trim()
        .min(1),
      title: Joi
        .string()
        .required()
        .trim()
        .min(1),
      text: Joi
        .string()
        .required()
        .trim()
        .min(1),
      date: Joi
        .string()
        .required(),
      source: Joi
        .string()
        .required()
        .trim()
        .min(1),
      link: Joi
        .string()
        .required()
        .custom(urlValidation),
      image: Joi
        .string()
        .required()
        .custom(urlValidation),
    }),
}), createArticle);
router.delete('/articles/:articleId', celebrate({
  params: Joi
    .object()
    .keys({
      articleId: Joi
        .string()
        .hex()
        .length(24),
    }),
}), deleteArticle);

module.exports = router;
