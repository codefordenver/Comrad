const db = require('../../../models/v1');

function update(req, res) {
  db.Venue.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbVenue => res.json(dbVenue))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
