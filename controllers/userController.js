const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.User
      .find({})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  
  create: (req, res) => {
    const { username, password } = req.body;

    db.User
      .create({ username, password })
      .then(dbNote => res.json(dbNote))
      .catch(err => res.json(err));
  }
}