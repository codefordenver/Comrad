const base = require('./base');

module.exports = {
  ...base,
  mongoURI: process.env.MONGO_URI,
  secretKey: process.env.SECRET_KEY,
};
