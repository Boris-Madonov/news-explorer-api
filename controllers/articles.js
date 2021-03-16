const Article = require('../models/article');
const {
  badRequestError,
  forbiddenError,
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
        description: req.body.description,
        publishedAt: req.body.publishedAt,
        source: {
          name: req.body.source.name,
        },
        url: req.body.url,
        urlToImage: req.body.urlToImage,
        owner: req.user._id,
      });

    res.status(200).send({
      _id: article._id,
      keyword: article.keyword,
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      source: {
        name: article.source.name,
      },
      url: article.url,
      urlToImage: article.urlToImage,
    });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(conflictError('Невалидные данные'));
    } else if (error.name === 'ValidationError') {
      next(badRequestError(error.message));
    } else {
      next(error);
    }
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId);
    if (!article) {
      throw notFoundError('Нет статьи с таким id');
    }
    if (toString(article.owner) !== toString(req.user._id)) {
      throw forbiddenError('Нет прав на удаление статьи');
    }
    article.deleteOne();

    res.status(200).send(article);
  } catch (error) {
    if (error.name === 'CastError') {
      next(badRequestError('Передан некорректный id'));
    } else {
      next(error);
    }
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
