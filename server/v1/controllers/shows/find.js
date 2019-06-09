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
  let { endDate, host, showsWithNoHost, startDate } = req.query;
  startDate = startDate ? JSON.parse(startDate) : null;
  endDate = endDate ? JSON.parse(endDate) : null;

  //This date filter allows the same endpoint to be used to find all shows or return a subset if both startDate and endDate are provided.
  const showDateFilter =
    startDate && endDate ? findShowQueryByDateRange(startDate, endDate) : {};

  db.Show.find(showDateFilter[0])
    .populate(populateShowHost())
    .populate(populateMasterShow())
    .then(dbShow => {
      let showResults = showList(dbShow, startDate, endDate);
      //apply filters, if they were provided
      //these filters can't be applied on the initial query because of series + instances possibly having
      //different values. For example, if we search for a show with a host of "Sean" and a series has
      //a host of "Sean" but the June 1 instance has a host of "Josh", the instance would be excluded from the initial
      //query, and this function would incorrectly return the June 1 instance thinking it has a hos a host of "Sean"
      if (host != null) {
        showResults = showResults.filter(function(val) {
          return (
            val.show_details.host != null && val.show_details.host._id == host
          );
        });
      }

      if (showsWithNoHost == 'true') {
        showResults = showResults.filter(function(val) {
          return val.show_details.host == null;
        });
      }

      res.json(showResults);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = find;
