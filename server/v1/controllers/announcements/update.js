const db = require('../../models');

function update(req, res) {
  db.Announcement.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(dbAnnouncement => res.json(dbAnnouncement))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
