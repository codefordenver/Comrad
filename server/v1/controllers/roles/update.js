const db = require('../../models');

function update(req, res) {
  db.Role.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(dbRole => res.json(dbRole))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
