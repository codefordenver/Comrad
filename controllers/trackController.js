const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Track
      .findById(req.params.id)
      .then(dbTrack => res.json(dbTrack))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Track
      .find({})
      .then(dbTrack => res.json(dbTrack))
      .catch(err => res.status(422).json(err))
  },

  create: (req, res) => {
    db.Track
      .insertMany(req.body)
      .then(dbTrack => res.json(dbTrack))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Track
      .findOneAndUpdate({ _id: req.params.id }, req.body, { rawResult: true })
      .then(dbTrack => res.json(dbTrack))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Track
      .findById({ _id: req.params.id })
      .then(dbTrack => dbTrack.remove())
      .then(dbTrack => res.json(dbTrack))
      .catch(err => res.status(422).json(err))
  }
}