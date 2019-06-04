const db = require('../../models');

function create(req, res) {
  db.Feature.create(req.body)
    .then(dbFeature => res.json(dbFeature))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
