const db = require('../../models');

function findAll(req, res) {
  db.Traffic.create(req.body)
    .then(dbEvent => res.json(dbEvent))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
