const db = require('../../../models/v1');

function findById(req, res) {
  db.User.findById(req.params.id)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
