const db = require('../../../models/v1');

function findById(req, res) {
  db.Venue.findById(req.params.id)
    .then(dbVenue => res.json(dbVenue))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
