const db = require('../../models');

function update(req, res) {
  db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
