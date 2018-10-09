const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Album
      .findById(req.params.id)
      .then(dbAlbum => res.json(dbAlbum))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Album
      .find({})
      .populate("tracks")
      .then(dbAlbum => res.json(dbAlbum))
      .catch(err => res.status(422).json(err));
  },

  search: (req, res) => {
    const q = new RegExp(req.body.title, 'i');

    db.Album
      .find({
        title: q
      })
      .then(dbAlbum => res.json(dbAlbum))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    
    db.Album
      .create(req.body)
      .then(dbAlbum => res.json(dbAlbum))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Album
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbAlbum => res.json(dbAlbum))
      .catch(err => res.status(422).json(err))
  },

  remove: (req, res) => {
    db.Album
      .findById({ _id: req.params.id })
      .then(dbAlbum => dbAlbum.remove())
      .then(dbAlbum => res.json(dbAlbum))
      .catch(err => res.status(422).json(err))
  }
}