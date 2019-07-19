const db = require('../../../models');

const {
  utils: { showList },
  utils__mongoose: { formatShow, populateShowHost },
} = require('../utils');

function create(req, res) {
  const { body } = req;
  const { startDate, endDate } = body;
  db.Show.create(formatShow(body, res))
    .then(dbShow => {
      db.Show.populate(dbShow, populateShowHost())
        .then(dbShow => {
          res.json(showList(dbShow, startDate, endDate));
        })
        .catch(err => {
          console.log('Error Populating Show Data from linked records');
          res.status(422).json(err);
        });
    })
    .catch(err => {
      console.log('Error Creating Show');
      console.error(err);
      res.status(422).json(err);
    });
}

module.exports = create;
