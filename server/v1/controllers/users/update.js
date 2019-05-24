const db = require('../../models');

function update(req, res) {
  const { id } = req.params;

  db.User.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
