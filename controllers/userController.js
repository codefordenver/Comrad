const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.User.findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.User.find({})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: 'You must provide email and password' });
    }

    db.User.findOne({ email }, function(err, existingUser) {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422).json({ error: 'User already exists' });
      }

      db.User.create(req.body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
    });
  },

  update: (req, res) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.User.findById({ _id: req.params.id })
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
