const db = require('../../models');

function update(req, res) {
  db.Permission.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(dbPermission => res.json(dbPermission))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
