const db = require('../../models');

function update(req, res) {
  db.Feature.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbFeature => res.json(dbFeature))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
