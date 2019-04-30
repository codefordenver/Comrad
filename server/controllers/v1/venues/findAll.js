const db = require('../../../models/v1');

function findAll(req, res) {
  db.Venue.find({})
    .then(dbVenue => res.json(dbVenue))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
