const db = require('../../models');

function remove(req, res) {
  db.Permission.findById({ _id: req.params.id })
    .then(dbPermission => dbPermission.remove())
    .then(dbPermission => res.json(dbPermission))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
