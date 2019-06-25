const db = require('../../models');

function create(req, res) {
  db.Album.create(req.body)
    .then(dbAlbum => res.json(dbAlbum))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
