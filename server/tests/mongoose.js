const mongoose = require('mongoose');
const keys = require('../config/keys');

const connect = () => {
  return mongoose.connect(
    keys.mongoURI,
    { useNewUrlParser: true },
  );
};

const disconnect = () => {
  return mongoose.disconnect();
};

module.exports = { connect, disconnect };
