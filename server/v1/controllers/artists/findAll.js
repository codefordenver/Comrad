const db = require('../../models');

async function findAll(req, res) {
  db.Artist.find({})
    .then(dbArtist => res.json(dbArtist))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
