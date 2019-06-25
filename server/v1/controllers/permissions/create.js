const db = require('../../models');

function create(req, res) {
  db.Permission.create(req.body)
    .then(dbPermission => res.json(dbPermission))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
