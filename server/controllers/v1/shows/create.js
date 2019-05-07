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
      console.log(dbShow);
      db.Show.populate(dbShow, {
        path: 'show_details.host',
        select: 'profile.first_name profile.last_name station.on_air_name',
      })
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
