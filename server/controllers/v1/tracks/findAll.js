// DON'T USE POPULATE! QUERY TOO LARGE!

const db = require('../../../models/v1');

function findAll(req, res) {
  db.Track.find({})
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
