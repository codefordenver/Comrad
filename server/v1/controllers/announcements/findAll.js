const db = require('../../models');

function findAll(req, res) {
  db.Announcement.find({})
    .then(dbAnnouncement => res.json(dbAnnouncement))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
