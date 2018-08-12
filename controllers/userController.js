const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.User
      .find({})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.User
      .create({ username: 'UserOne', password: 'password' })
      .then(dbNote => res.json(dbNote))
      .catch(err => res.json(err));
  }
}