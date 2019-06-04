const db = require('../../models');

function findById(req, res) {
  db.Track.findById(req.params.id)
    .populate('album')
    .populate('artists')
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
