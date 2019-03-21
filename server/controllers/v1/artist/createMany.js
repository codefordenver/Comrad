const db = require('../../../models/v1');

function createMany(req, res) {
  db.Artist.create(req.body)
    .then(dbArtist => res.json(dbArtist))
    .catch(err => res.status(422).json(err));
}

module.exports = createMany;
