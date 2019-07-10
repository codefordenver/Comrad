const db = require('../../models');

function remove(req, res) {
  db.Role.findById({ _id: req.params.id })
    .then(dbRole => dbRole.remove())
    .then(dbRole => res.json(dbRole))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
