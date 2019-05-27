const db = require('../../models');

function create(req, res) {
  db.Album.create(req.body)
    .then(dbAnnouncement => res.json(dbAnnouncement))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
