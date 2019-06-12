const db = require('../../models');

function remove(req, res) {
  db.Show.findById({ _id: req.params.id })
    .then(dbShow => dbShow.remove())
    .then(dbShow => res.json(dbShow))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
