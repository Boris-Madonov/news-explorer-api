const Article = require('../models/article');
const {
  badRequestError,
  notFoundError,
} = require('../errors/errors');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({})
      .map((i) => toString(i.owner) === toString(req.user._id));

    return res.send(articles);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const article = await Article.create({
      keyword: req.body.keyword,
      title: req.body.title,
      text: req.body.text,
      date: Date.now(),
      source: req.body.source,
      link: req.body.link,
      image: req.body.image,
    });

    return res.send(article);
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      return badRequestError(error.message);
    }
    return next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      throw notFoundError('Нет статьи с таким id');
    }
    if (toString(article.owner) !== toString(req.user._id)) {
      throw notFoundError('Нет прав на удаление статьи');
    }
    article.deleteOne();

    return res.send(article);
  } catch (error) {
    console.log(error);
    if (error.name === 'CastError') {
      return badRequestError('Передан некорректный id');
    }
    return next(error);
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
