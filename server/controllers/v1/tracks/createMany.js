const db = require('../../../models/v1');

function createMany(req, res) {
  db.Track.insertMany(req.body)
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = createMany;
