const db = require('../../../models/v1');

function create(req, res) {
  db.Giveaway.create(req.body)
    .then(dbGiveaway => res.json(dbGiveaway))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
