const db = require('../../models');
const {
  validateAlbumData,
  validateArtistData,
  validateTrackData,
} = require('./utils');

function update(req, res) {
  db.Library.findOne({ _id: req.params.id })
    .then(libraryData => {
      const { artist, name } = libraryData;

      switch (libraryData.type) {
        case 'album':
          return validateAlbumData({ artist, name, ...req.body }, req.params.id)
            .then(albumData => {
              db.Library.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
              })
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
          return validateArtistData(req.body, req.params.id)
            .then(updateTo => {
              updateTo.updated_at = Date.now();
              db.Library.findOneAndUpdate({ _id: req.params.id }, updateTo, {
                new: true,
              })
                .then(dbArtist => res.json(dbArtist))
                .catch(err => res.status(422).json(err));
            })
            .catch(err => {
              console.error(err);
              res.status(422).json({
                errorMessage: err,
              });
              return;
            });
        case 'track':
          return validateTrackData(req.body)
            .then(() =>
              db.Library.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
              })
                .populate('artists')
                .populate('album'),
            )

            .then(dbTrack => res.json(dbTrack))
            .catch(err => res.status(422).json({ errorMessage: err }));
        default:
          return res.status(422).json({
            errorMessage: 'library entity was not of a known type',
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
    });
}

module.exports = update;
