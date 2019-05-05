const db = require('../../../models/v1');

const {
  formatShow,
  utils: { showList },
} = require('./utils');

function create(req, res) {
  const { startDate, endDate } = req.body;
  debugger;
  db.Show.create(formatShow(req, res))
    .then(dbShow => {
      res.json(showList([dbShow], startDate, endDate));
    })
    .catch(err => res.status(422).json(err));
}

module.exports = create;
