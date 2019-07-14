const db = require('../../models');

function create(req, res) {
  db.Resource.create(req.body)
    .then(dbResource => res.json(dbResource))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
