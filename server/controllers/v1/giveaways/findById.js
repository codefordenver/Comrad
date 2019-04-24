const db = require('../../../models/v1');

function findById(req, res) {
  db.Giveaway.findById(req.params.id)
    .then(dbGiveaway => res.json(dbGiveaway))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
