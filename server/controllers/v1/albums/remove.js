const db = require('../../../models/v1');

function remove(req, res) {
  db.Album.findById({ _id: req.params.id })
    .then(dbAlbum => dbAlbum.remove())
    .then(dbAlbum => res.json(dbAlbum))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
