const db = require('../../../models/v1');

function findAll(req, res) {
  db.Show.find({})
    .then(dbShow => res.status(200).json(dbShow))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
