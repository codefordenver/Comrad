const db = require('../../../models/v1');

function findById(req, res) {
  db.Artist.findById(req.params.id)
    .then(dbArtist => res.json(dbArtist))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
