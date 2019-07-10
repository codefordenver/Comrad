const db = require('../../models');
const { validateAlbumData } = require('./utils');

function createMany(req, res) {
  let albumPromises = [];
  let albumError = false;
  req.body.forEach(function(album) {
    albumPromises.push(validateAlbumData(album));
    if (typeof album.name === 'undefined') {
      res.status(422).json({
        errorMessage: 'name is required',
      });
      albumError = true;
    }
  });
  if (albumError) {
    return;
  }
  Promise.all(albumPromises)
    .then(values => {
      db.Album.insertMany(values)
        .then(dbalbum => res.json(dbalbum))
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
