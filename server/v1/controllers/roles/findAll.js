const db = require('../../models');

function findAll(req, res) {
  db.Role.find({})
    .then(dbRole => {
      res.json(dbRole);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
