const db = require('../../models');

function findAll(req, res) {
  db.Resource.find({}, req.ac.fields)
    .then(dbResource => res.json(dbResource))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
