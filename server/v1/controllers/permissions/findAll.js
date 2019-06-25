const db = require('../../models');

function findAll(req, res) {
  db.Permission.find({})
    .populate('artist')
    .then(dbPermission => res.json(dbPermission))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
