const db = require('../../../models/v1');

function search(req, res) {
  const q = new RegExp(req.body.title, 'i');

  db.Traffic.find({
    title: q,
  })
    .then(dbEvent => res.json(dbEvent))
    .catch(err => res.status(422).json(err));
}

module.exports = search;
