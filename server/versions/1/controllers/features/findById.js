const db = require('../../models');

function findById(req, res) {
  db.Feature.findById(req.params.id)
    .then(dbFeature => res.json(dbFeature))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
