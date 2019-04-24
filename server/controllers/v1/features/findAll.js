const db = require('../../../models/v1');

function findAll(req, res) {
  db.Feature.find({})
    .then(dbFeature => res.json(dbFeature))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
