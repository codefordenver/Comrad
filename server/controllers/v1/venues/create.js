const db = require('../../../models/v1');

function create(req, res) {
  db.Venue.create(req.body)
    .then(dbVenue => res.json(dbVenue))
    .catch(err => res.json(err));
}

module.exports = create;
