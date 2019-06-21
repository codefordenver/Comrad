const db = require('../../models');
const { validateTrackData } = require('./utils');

function create(req, res) {
  validateTrackData(req.body)
    .then(() => db.Track.create(req.body))
    .then(dbTrack => res.json(dbTrack))
    .catch(err => {
      console.log(err);
      res.status(422).json(err);
    });
}

module.exports = create;
