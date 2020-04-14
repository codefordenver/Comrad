const db = require('../../models');

function remove(req, res) {
  db.Resource.findById({ _id: req.params.id })
    .then(dbResource => dbResource.remove())
    .then(dbResource => res.json(dbResource))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
