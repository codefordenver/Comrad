const db = require('../../models');

function create(req, res) {
  db.User.create(req.body)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = create;
