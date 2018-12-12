const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Traffic.findById(req.params.id)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Traffic.find({})
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Traffic.create(req.body)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Traffic.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Traffic.findById({ _id: req.params.id })
      .then(dbEvent => dbEvent.remove())
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  search: (req, res) => {
    const q = new RegExp(req.body.title, 'i');

    db.Traffic.find({
      title: q,
    })
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  EXAMPLE: (req, res) => {
    const hellostring = 'Traffic Requested';
    res.json({ hellostring });
  },
};
