const db = require('../../../models');

function findById(req, res) {
  db.Show.findById(req.params.id)
    .then(dbShow => res.json(dbShow))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
