const db = require('../../../models/v1');
const keys = require('../../../config/keys');

function findAll(req, res) {
  const { page = 1 } = req.query;
  db.Show.find({}, null, {
    skip: (page - 1) * keys.queryPageSize,
    limit: keys.queryPageSize,
  })
    .then(dbShow => res.status(200).json(dbShow))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
