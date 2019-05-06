const db = require('../../../models/v1');

async function findTracks(req, res) {
  db.Track.find({ album: req.params.id })
    .sort({ disk_number: 1, track_number: 1 })
    .then(async results => res.json(results))
    .catch(err => res.status(422).json(err));
}

module.exports = findTracks;
