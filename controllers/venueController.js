const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Venue
      .findById(req.params.id)
      .then(dbVenue => res.json(dbVenue))
      .catch(err => res.status(422).json(err))
  },

  findAll: (req, res) => {
    db.Venue
      .find({})
      .then(dbVenue => res.json(dbVenue))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Venue
      .create(req.body)
      .then(dbVenue => res.json(dbVenue))
      .catch(err => res.json(err))
  },

  update: (req, res) => {
    db.Venue
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbVenue => res.json(dbVenue))
      .catch(err => res.status(422).json(err))
  },

  remove: (req, res) => {
    db.Venue
      .findById({ _id: req.params.id })
      .then(dbVenue => dbVenue.remove())
      .then(dbVenue => res.json(dbVenue))
      .catch(err => res.status(422).json(err))
  }
}