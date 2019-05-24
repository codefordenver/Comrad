const db = require('../../models');

const {
  utils: { createNewShow, showList },
} = require('./utils');

function create(req, res) {
  db.Show.create(createNewShow(req, res))
    .then(dbShow => {
      console.log(dbShow);
      db.Show.populate(dbShow, {
        path: 'show_details.host',
        select: 'profile.first_name profile.last_name station.on_air_name',
      })
        .then(dbShow => {
          console.log('TEST');
          console.log(dbShow);
          res.json(showList([dbShow]));
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
