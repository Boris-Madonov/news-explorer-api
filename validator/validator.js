const { CelebrateError } = require('celebrate');
const isURL = require('validator/lib/isURL');

const urlValidation = (v) => {
  if (!isURL(v)) {
    throw new CelebrateError('Не корректный URL');
  }
  return v;
};

module.exports = urlValidation;
