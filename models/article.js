const { Schema, model } = require('mongoose');
const isURL = require('validator/lib/isURL');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  source: {
    name: {
      type: String,
      required: true,
    },
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: (props) => `${props.v} ошибка в ссылке`,
    },
  },
  urlToImage: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: (props) => `${props.v} ошибка в ссылке`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    select: false,
  },
});

module.exports = model('article', articleSchema);
