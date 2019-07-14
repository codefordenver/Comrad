const db = require('../../models');

function update(req, res) {
  db.Resource.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbResource => res.json(dbResource))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
