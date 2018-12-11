const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Show.findById(req.params.id)
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Show.find({})
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Show.create(req.body)
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Show.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Show.findById({ _id: req.params.id })
      .then(dbShow => dbShow.remove())
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  },

  EXAMPLE: (req, res) => {
    const hellostring = 'Show Requested';
    res.json({ hellostring });
  },
};
