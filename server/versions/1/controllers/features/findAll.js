const db = require('../../models');

function findAll(req, res) {
  db.Feature.find({})
    .then(dbFeature => res.json(dbFeature))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
