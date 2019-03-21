const db = require('../../../models/v1');

function findByActive(req, res) {
  const sort_by = req.query.sort_by ? req.query.sort_by : 'on_air_name';
  const status = req.params.status ? req.params.status : 'Active';
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const page = Math.max(0, Number(req.query.page));

  db.User.find({ status: status })
    .sort(sort_by)
    .limit(limit)
    .skip(limit * page)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
}

module.exports = findByActive;
