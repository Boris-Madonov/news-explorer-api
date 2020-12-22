require('dotenv').config();

const devUrl = 'mongodb://localhost:27017/newsexplorerdb';
const devJWT = 'dev-secret';
const {
  API_URL,
  PORT,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const port = PORT || 3000;
const endpoint = NODE_ENV === 'prodaction' ? API_URL : devUrl;
const JWTKey = NODE_ENV === 'prodaction' ? JWT_SECRET : devJWT;

module.exports = {
  port,
  endpoint,
  JWTKey,
};
