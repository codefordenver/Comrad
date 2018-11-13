const db = require('../models');

module.exports = {
  findById: async (req, res) => {

    const dbAlbum = await db.Album.findById(req.params.id).populate('artist');
    const dbTracks = await db.Track.find({ album: dbAlbum._id });
    const data = {
      ...dbAlbum._doc,
      tracks: dbTracks
    }

    res.json(data);
  },

  findAll: (req, res) => {
    db.Album
      .find({})
      .populate("artist")
      .then(dbAlbum => res.json(dbAlbum))
      .catch(err => res.status(422).json(err));
  },

  search: (req, res) => {
    const q = new RegExp(req.body.name, 'i');

    db.Album
      .find({
        name: q
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

  createMany: (req, res) => {
    db.Album
      .insertMany(req.body)
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