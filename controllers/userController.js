const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.User
      .findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

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
  },

  update: (req, res) => {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.User
      .findById({ _id: req.params.id })
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
}