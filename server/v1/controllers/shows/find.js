const db = require('../../models');

const {
  utils: { showList },
  utils__mongoose: {
    findShowQueryByDateRange,
    populateShowHost,
    populateMasterShow,
  },
} = require('./utils');

function find(req, res) {
  let { startDate, endDate } = req.query;
  startDate = startDate ? JSON.parse(startDate) : null;
  endDate = endDate ? JSON.parse(endDate) : null;

  //This date filter allows the same endpoint to be used to find all shows or return a subset if both startDate and endDate are provided.
  const showDateFilter =
    startDate && endDate ? findShowQueryByDateRange(startDate, endDate) : {};

  db.Show.find(showDateFilter[0])
    .populate(populateShowHost())
    .populate(populateMasterShow())
    .then(dbShow => {
      showList(dbShow, startDate, endDate).then(shows => res.json(shows));
    })
    .catch(err => res.status(422).json(err));
}

module.exports = find;
