const db = require('../../models');
const { validateAlbumData } = require('./utils');

function create(req, res) {
  if (typeof req.body.name === 'undefined') {
    res.status(422).json({
      errorMessage: 'name is required',
    });
    return;
  }
  validateAlbumData(req.body)
    .then(albumData => {
      db.Album.create(albumData)
        .then(dbAlbum => res.json(dbAlbum))
        .catch(err => res.status(422).json(err));
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
    });
}

module.exports = create;
