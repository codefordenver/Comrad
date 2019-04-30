const db = require('../../../models/v1');

const {
  utils: { createNewShow, showList },
} = require('./utils');

function create(req, res) {
  db.Show.create(createNewShow(req, res))
    .then(dbShow => {
      res.json(showList([dbShow]));
    })
    .catch(err => res.status(422).json(err));
}

module.exports = create;
