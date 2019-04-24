const db = require('../../../models/v1');

function remove(req, res) {
  db.Announcement.findById({ _id: req.params.id })
    .then(dbAnnouncement => dbAnnouncement.remove())
    .then(dbAnnouncement => res.json(dbAnnouncement))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
