const db = require('../../models');

function update(req, res) {
  db.Track.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
