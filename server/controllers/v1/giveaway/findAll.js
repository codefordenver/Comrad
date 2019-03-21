const db = require('../../../models/v1');

function findAll(req, res) {
  db.Giveaway.find({})
    .then(dbGiveaway => res.json(dbGiveaway))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
