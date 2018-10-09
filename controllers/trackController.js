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
      .populate('album')
      .then(dbTrack => res.json(dbTrack))
      .catch(err => res.status(422).json(err))
  },

  create: (req, res) => {
    const { album_id } = req.body[0];

    // Create Array of Tracks
    db.Track
      .insertMany(req.body)
      .then(dbTracks => {

        // Search for album ID and save tracks to ablum
        db.Album
          .findById(album_id)
          .then(dbAlbum => {

            dbTracks.map(dbTrack => {
              dbAlbum.tracks.push(dbTrack);
            });

            dbAlbum.save();
            res.json(dbTracks);
          })
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Track
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
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