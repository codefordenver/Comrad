const db = require('../../models');

function create(req, res) {
  db.Track.create(req.body)
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
