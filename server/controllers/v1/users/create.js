const db = require('../../../models/v1');

function create(req, res) {
  db.User.create(req.body)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json({ error: err.message }));
}

module.exports = create;
