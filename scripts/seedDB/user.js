require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../../models');
const keys = require('../../config/keys');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const userSeeds = require('./lib/userSeeds.json');
// db.User.remove({}).catch(err => res.json(err));

db.User
  .insertMany(userSeeds)
  .then(() => {
    console.log('Seed Complete');
    process.exit(0);
  });
