const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Event
      .findById(req.params.id)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Event
      .find({})
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Event
      .create(req.body)
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Event
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Event
      .findById({ _id: req.params.id })
      .then(dbEvent => dbEvent.remove())
      .then(dbEvent => res.json(dbEvent))
      .catch(err => res.status(422).json(err));
  },

  EXAMPLE: (req, res) => {
    hellostring = 'Hello World';
    res.json({hellostring});
  },
}