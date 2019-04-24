const db = require('../../../models/v1');

function remove(req, res) {
  db.Venue.findById({ _id: req.params.id })
    .then(dbVenue => dbVenue.remove())
    .then(dbVenue => res.json(dbVenue))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
