const db = require('../../../models/v1');

function remove(req, res) {
  db.Traffic.findById({ _id: req.params.id })
    .then(dbEvent => dbEvent.remove())
    .then(dbEvent => res.json(dbEvent))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
