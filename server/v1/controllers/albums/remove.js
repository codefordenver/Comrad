const db = require('../../models');

function remove(req, res) {
  db.Track.findOne({ album: req.params.id })
    .then(trackReferencingAlbum => {
      if (trackReferencingAlbum != null) {
        throw 'This album cannot be deleted because it has tracks.';
      }

      db.Album.findById({ _id: req.params.id })
        .then(dbAlbum => dbAlbum.remove())
        .then(dbAlbum => res.json(dbAlbum))
        .catch(err => res.status(422).json(err));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = remove;
