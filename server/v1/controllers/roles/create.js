const db = require('../../models');

function create(req, res) {
  db.Role.create(req.body)
    .then(dbRole => res.json(dbRole))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
