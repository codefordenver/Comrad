const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Giveaway
      .findById(req.params.id)
      .then(dbGiveaway => res.json(dbGiveaway))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Giveaway
      .find({})
      .then(dbGiveaway => res.json(dbGiveaway))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Giveaway
      .create(req.body)
      .then(dbGiveaway => res.json(dbGiveaway))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Giveaway
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbGiveaway => res.json(dbGiveaway))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Giveaway
      .findById({ _id: req.params.id })
      .then(dbGiveaway => dbGiveaway.remove())
      .then(dbGiveaway => res.json(dbGiveaway))
      .catch(err => res.status(422).json(err));
  }
}