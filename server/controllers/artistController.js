const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Artist.findById(req.params.id)
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Artist.find({})
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Artist.create(req.body)
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.status(422).json(err));
  },

  createMany: (req, res) => {
    db.Artist.insertMany(req.body)
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.json(422).json(err));
  },

  update: (req, res) => {
    db.Artist.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Artist.findById({ _id: req.params.id })
      .then(dbArtist => dbArtist.remove())
      .then(dbArtist => res.json(dbArtist))
      .catch(err => res.status(422).json(err));
  },
};
