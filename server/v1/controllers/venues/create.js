const db = require('../../models');

function create(req, res) {
  db.Venue.create(req.body)
    .then(dbVenue => res.json(dbVenue))
    .catch(err => res.json(err));
}

module.exports = create;
