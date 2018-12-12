const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Announcement.findById(req.params.id)
      .then(dbAnnouncement => res.json(dbAnnouncement))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Announcement.find({})
      .then(dbAnnouncement => res.json(dbAnnouncement))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Announcement.create(req.body)
      .then(dbAnnouncement => res.json(dbAnnouncement))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Announcement.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then(dbAnnouncement => res.json(dbAnnouncement))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Announcement.findById({ _id: req.params.id })
      .then(dbAnnouncement => dbAnnouncement.remove())
      .then(dbAnnouncement => res.json(dbAnnouncement))
      .catch(err => res.status(422).json(err));
  },
};
