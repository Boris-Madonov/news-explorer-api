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
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: (props) => `${props.v} ошибка в ссылке`,
    },
  },
  image: {
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
