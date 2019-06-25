const db = require('../../models');

function remove(req, res) {
  db.Album.findOne({ artist: req.params.id })
    .then(albumReferencingArtist => {
      if (albumReferencingArtist != null) {
        throw 'The artist cannot be deleted because it has albums.';
      }
      db.Track.findOne({ artist: req.params.id })
        .then(trackReferencingArtist => {
          if (trackReferencingArtist != null) {
            throw 'The artist cannot be deleted because it has tracks.';
          }
          db.Artist.findById({ _id: req.params.id })
            .then(dbArtist => dbArtist.remove())
            .then(dbArtist => res.json(dbArtist))
            .catch(err => res.status(422).json({ errorMessage: err }));
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = remove;
