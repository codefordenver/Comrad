const base = require('./base');

module.exports = {
  ...base,
  mongoURI: process.env.MONGO_DEV,
  secretKey: process.env.SECRET_KEY,
};
