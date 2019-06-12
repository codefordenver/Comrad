const db = require('../../models');

function findById(req, res) {
  db.Announcement.findById(req.params.id)
    .then(dbAnnouncement => res.json(dbAnnouncement))
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
