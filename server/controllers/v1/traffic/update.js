const db = require('../../../models/v1');

function update(req, res) {
  db.Traffic.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbEvent => res.json(dbEvent))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
