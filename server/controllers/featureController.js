const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Feature
      .findById(req.params.id)
      .then(dbFeature => res.json(dbFeature))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Feature
      .find({})
      .then(dbFeature => res.json(dbFeature))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Feature
      .create(req.body)
      .then(dbFeature => res.json(dbFeature))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Feature
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbFeature => res.json(dbFeature))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Feature
      .findById({ _id: req.params.id })
      .then(dbFeature => dbFeature.remove())
      .then(dbFeature => res.json(dbFeature))
      .catch(err => res.status(422).json(err));
  }
}