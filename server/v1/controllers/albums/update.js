const db = require('../../models');
const { validateAlbumData } = require('./utils');

function update(req, res) {
  db.Album.findOne({ _id: req.params.id })
    .then(albumData => {
      const { artist, name } = albumData;
      validateAlbumData({ artist, name, ...req.body }, req.params.id)
        .then(albumData => {
          db.Album.findOneAndUpdate({ _id: req.params.id }, req.body, {
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
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
    });
}

module.exports = update;
