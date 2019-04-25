const db = require('../../../models/v1');

function remove(req, res) {
  db.Feature.findById({ _id: req.params.id })
    .then(dbFeature => dbFeature.remove())
    .then(dbFeature => res.json(dbFeature))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
