const db = require('../../models');

function findAll(req, res) {
  if (!req.user) {
    return res.status(422).json('Must be logged in');
  }

  const { permission } = req.user.station;

  if (permission.toLowerCase() !== 'admin') {
    return res.status(422).json('User must have admin access');
  }

  db.User.find({})
    .then(dbUsers => res.json(dbUsers))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
