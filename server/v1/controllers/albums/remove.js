const db = require('../../models');

function remove(req, res) {
  db.Album.findById({ _id: req.params.id })
    .then(dbAlbum => dbAlbum.remove())
    .then(dbAlbum => res.json(dbAlbum))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
