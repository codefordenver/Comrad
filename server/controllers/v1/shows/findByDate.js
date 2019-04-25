const db = require('../../../models/v1');

const {
  utils: { findShowQueryByDateRange, repeatRuleShows },
} = require('./utils');

function findByDate(req, res) {
  let { startDate, endDate } = req.query;
  startDate = JSON.parse(startDate);
  endDate = JSON.parse(endDate);

  db.Show.find()
    .and(findShowQueryByDateRange(startDate, endDate))
    .populate('show_details.host', ['profile.first_name', 'profile.last_name'])
    .then(dbShow => {
      res.json(repeatRuleShows(dbShow));
    })
    .catch(err => res.status(422).json(err));
}

module.exports = findByDate;
