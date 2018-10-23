require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../../models');
const keys = require('../../config/keys');
const userSeeds = require('./lib/users.json');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

// Remove all users except the comrad.development user account
db.User.deleteMany({"email": {"$ne": "comrad.development@gmail.com"}}, function (err) {
  if (err) return handleError(err);
});

userSeeds.forEach(seed => {
  db.User.create(seed).catch(err => console.log(err));
});
