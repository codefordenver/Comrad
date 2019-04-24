const db = require('../../../models/v1');

function remove(req, res) {
  db.Track.findById({ _id: req.params.id })
    .then(dbTrack => dbTrack.remove())
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
