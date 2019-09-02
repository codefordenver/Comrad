const db = require('../../models');

function remove(req, res) {
  return db.Library.findOne({ _id: req.params.id })
    .then(libraryData => {
      switch (libraryData.type) {
        case 'album':
          return db.Library.findOne({ album: req.params.id })
            .then(trackReferencingAlbum => {
              if (trackReferencingAlbum != null) {
                throw 'This album cannot be deleted because it has tracks.';
              }

              db.Library.findById({ _id: req.params.id })
                .then(dbAlbum => dbAlbum.remove())
                .then(dbAlbum => res.json(dbAlbum))
                .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json({ errorMessage: err }));
        case 'artist':
          return db.Library.findOne({ artist: req.params.id })
            .then(albumReferencingArtist => {
              if (albumReferencingArtist != null) {
                throw 'The artist cannot be deleted because it has albums.';
              }
              db.Library.findOne({ artist: req.params.id })
                .then(trackReferencingArtist => {
                  if (trackReferencingArtist != null) {
                    throw 'The artist cannot be deleted because it has tracks.';
                  }
                  db.Library.findById({ _id: req.params.id })
                    .then(dbArtist => dbArtist.remove())
                    .then(dbArtist => res.json(dbArtist))
                    .catch(err => res.status(422).json({ errorMessage: err }));
                })
                .catch(err => res.status(422).json({ errorMessage: err }));
            })
            .catch(err => res.status(422).json({ errorMessage: err }));
        case 'track':
          return db.Playlist.findOne({ scratchpad: { track: req.params.id } })
            .then(trackReferencingPlaylist => {
              if (trackReferencingPlaylist != null) {
                throw 'This track cannot be deleted because it is being used in a playlist.';
              }
            })
            .then(
              db.Playlist.findOne({
                saved_items: { track: req.params.id },
              }).then(trackReferencingPlaylist => {
                if (trackReferencingPlaylist != null) {
                  throw 'This track cannot be deleted because it is being used in a playlist.';
                }
              }),
            )
            .then(db.Library.findById({ _id: req.params.id }))
            .then(dbTrack => dbTrack.remove())
            .then(dbTrack => res.json(dbTrack))
            .catch(err => res.status(422).json(err));
        default:
          return res.status(422).json({
            errorMessage: 'library entity was not of a known type',
          });
      }
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = remove;
