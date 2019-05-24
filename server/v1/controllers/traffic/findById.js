const db = require('../../models');

function findById(req, res) {
  db.Traffic.findById(req.params.id)
    .then(dbEvent => res.json(dbEvent))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
