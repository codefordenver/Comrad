const db = require('../../models');
const {
  validateAlbumData,
  validateArtistData,
  validateTrackData,
} = require('./utils');

function createMany(req, res) {
  let libraryPromises = [];
  let hasError = false;
  req.body.forEach(function(entity) {
    if (typeof entity.name === 'undefined') {
      res.status(422).json({
        errorMessage: 'name is required',
      });
      hasError = true;
    }
    if (typeof entity.type === 'undefined') {
      res.status(422).json({
        errorMessage: 'type is required',
      });
      hasError = true;
    }

    switch (entity.type) {
      case 'album':
        libraryPromises.push(validateAlbumData(entity));
        break;
      case 'artist':
        libraryPromises.push(validateArtistData(entity));
        break;
      case 'track':
        libraryPromises.push(validateTrackData(entity));
        break;
      default:
        res.status(422).json({
          errorMessage: 'received an unexpected value for "type"',
        });
        hasError = true;
    }
  });
  if (hasError) {
    return;
  }

  Promise.all(libraryPromises)
    .then(values => {
      db.Library.insertMany(values)
        .then(dbLibrary => res.json(dbLibrary))
        .catch(err => res.json(422).json(err));
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
      return;
    });
}

module.exports = createMany;
