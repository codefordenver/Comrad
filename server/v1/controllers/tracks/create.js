const db = require('../../models');
const { validateTrackData } = require('./utils');

function create(req, res) {
  //validateTrackData(req.body, req.params.albumId)
  //  .then(req => db.Track.create(req.body))
  //  .then(dbTrack => res.json(dbTrack))
  //  .catch(err => res.status(422).json(err));
  db.Track.create(req.body)
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
