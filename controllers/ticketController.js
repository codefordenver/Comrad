const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.Ticket
      .findById(req.params.id)
      .then(dbTicket => res.json(dbTicket))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.Ticket
      .find({})
      .then(dbTicket => res.json(dbTicket))
      .catch(err => res.status(422).json(err));
  },

  create: (req, res) => {
    db.Ticket
      .create(req.body)
      .then(dbTicket => res.json(dbTicket))
      .catch(err => res.status(422).json(err));
  },

  update: (req, res) => {
    db.Ticket
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbTicket => res.json(dbTicket))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.Ticket
      .findById({ _id: req.params.id })
      .then(dbTicket => dbTicket.remove())
      .then(dbTicket => res.json(dbTicket))
      .catch(err => res.status(422).json(err));
  }
}