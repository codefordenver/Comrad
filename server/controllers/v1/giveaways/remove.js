const db = require('../../../models/v1');

function remove(req, res) {
  db.Giveaway.findById({ _id: req.params.id })
    .then(dbGiveaway => dbGiveaway.remove())
    .then(dbGiveaway => res.json(dbGiveaway))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
