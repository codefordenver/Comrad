const db = require('../../../models/v1');

function search(req, res) {
  const { name } = req.query;

  const nameRE = new RegExp(name, 'i');

  db.Track.find({
    name: nameRE,
  })
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = search;
