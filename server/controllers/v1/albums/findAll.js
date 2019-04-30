const db = require('../../../models/v1');

function findAll(req, res) {
  db.Album.find({})
    .populate('artist')
    .then(dbAlbum => res.json(dbAlbum))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
