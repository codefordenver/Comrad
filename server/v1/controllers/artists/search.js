const db = require('../../models');

function search(req, res) {
  const { name } = req.query;

  const nameRE = new RegExp(name, 'i');

  db.Artist.find({
    name: nameRE,
  })
    .then(dbArtist => res.json(dbArtist))
    .catch(err => res.status(422).json(err));
}

module.exports = search;
