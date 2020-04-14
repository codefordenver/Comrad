const db = require('../../models');
const {
  validateAlbumData,
  validateArtistData,
  validateTrackData,
} = require('./utils');

function create(req, res) {
  if (typeof req.body.type === 'undefined') {
    res.status(422).json({
      errorMessage: 'type is required',
    });
    return;
  }
  if (typeof req.body.name === 'undefined') {
    res.status(422).json({
      errorMessage: 'name is required',
    });
    return;
  }

  switch (req.body.type) {
    case 'album':
      return validateAlbumData(req.body)
        .then(albumData => {
          db.Library.create(albumData)
            .then(dbAlbum => db.Library.populate(dbAlbum, ['genre', 'artist']))
            .then(dbAlbum => res.json(dbAlbum))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => {
          console.error(err);
          res.status(422).json({
            errorMessage: err,
          });
        });
    case 'artist':
      return validateArtistData(req.body)
        .then(artistData => {
          db.Library.create(artistData)
            .then(dbArtist => res.json(dbArtist))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => {
          console.error(err);
          res.status(422).json({
            errorMessage: err,
          });
        });
    case 'track':
      return validateTrackData(req.body)
        .then(() => db.Library.create(req.body))
        .then(dbTrack => db.Library.populate(dbTrack, ['album', 'artists']))
        .then(dbTrack => res.json(dbTrack))
        .catch(err => {
          console.log(err);
          res.status(422).json({ errorMessage: err });
        });
    default:
      res.status(422).json({
        errorMessage: 'received an unexpected value for "type"',
      });
      return;
  }
}

module.exports = create;
