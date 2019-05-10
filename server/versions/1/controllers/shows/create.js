const db = require('../../models');

const {
  utils: { showList },
  utils__mongoose: { formatShow, populateShowQuery },
} = require('./utils');

function create(req, res) {
  const { body } = req;
  const { startDate, endDate } = body;
  db.Show.create(formatShow(body, res))
    .then(dbShow => {
      console.log(dbShow);
      db.Show.populate(dbShow, populateShowQuery())
        .then(dbShow => {
          console.log('TEST');
          console.log(dbShow);
          res.json(showList([dbShow], startDate, endDate));
        })
        .catch(err => {
          console.error(err);
          res.status(422).json(err);
        });
    })
    .catch(err => {
      console.log('this error');
      console.log(err);
      res.status(422).json(err);
    });
}

module.exports = create;
