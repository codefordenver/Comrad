const db = require('../../models');

function create(req, res) {
  db.AccessControl.create(req.body)
    .then(dbAccessControl => res.json(dbAccessControl))
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = create;
