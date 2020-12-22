const Article = require('../models/article');
const {
  badRequestError,
  notFoundError,
  conflictError,
} = require('../errors/errors');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article
      .find({ owner: req.user._id });

    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const article = await Article
      .create({
        keyword: req.body.keyword,
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        source: req.body.source,
        link: req.body.link,
        image: req.body.image,
        owner: req.user._id,
      });

    res.status(200).send({
      _id: article._id,
      keyword: article.keyword,
      title: article.title,
      text: article.text,
      date: article.date,
      source: article.source,
      link: article.link,
      image: article.image,
    });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(conflictError('Невалидные данные'));
    } else if (error.name === 'ValidationError') {
      next(badRequestError(error.message));
    }
    next(error);
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

    res.status(200).send(article);
  } catch (error) {
    if (error.name === 'CastError') {
      next(badRequestError('Передан некорректный id'));
    }
    next(error);
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
