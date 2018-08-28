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
    const { album, tracks } = req.body;

    db.Album
      .create(album)
      .then(dbAlbum => {
        
        // If user DID NOT add tracks with new album, server will respond with new album
        if (tracks.length === 0) {
          res.json(dbAlbum);

          // If user PROVIDED an array of tracks, we will save each track in the DB
          // with the new album ID
        } else {
          const trackPromise = tracks.map((track, i) => {

            track['album_id'] = dbAlbum._id;

            return db.Track
              .create(track)
              .then(dbTrack => {
                dbAlbum.tracks.push(dbTrack._id);
              })
              .catch(err => res.status(422).json(err));
          });

          // Using a promise, we want to make sure all the tracks are created before
          // saving the new dbAlbum
          Promise.all(trackPromise).then(() => {
            dbAlbum
              .save()
              .then(dbAlbum => res.json(dbAlbum))
              .catch(err => res.status(422).json(err));
          });
        }
      })
      .catch(err => res.status(422).json(err))
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