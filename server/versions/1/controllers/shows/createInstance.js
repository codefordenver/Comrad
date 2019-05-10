const db = require('../../../models/v1');
const mongoose = require('mongoose');
const moment = require('moment');

function createInstance(req, res) {
  const {
    show_start_time_utc,
    show_end_time_utc,
    show_details: { host },
  } = req.body;
  const { id } = req.params;

  console.log(show_start_time_utc);

  db.Show.findById(id).exec(function(err, doc) {
    let d1 = doc;
    d1._id = mongoose.Types.ObjectId();
    d1.master_show_uid = id;
    d1.show_details.host = host;
    d1.show_start_time_utc = show_start_time_utc;
    d1.show_end_time_utc = show_end_time_utc;
    d1.repeat_rule.repeat_start_date = show_start_time_utc;
    d1.repeat_rule.repeat_end_date = show_end_time_utc;
    d1.show_end_time_utc = show_end_time_utc;
    d1.replace_show_date = show_start_time_utc;
    d1.is_recurring = false;
    d1.created_at = Date.now();
    d1.updated_at = Date.now();
    d1.isNew = true;
    d1.save()
      .then(dbShow => {
        db.Show.populate(dbShow, {
          path: 'show_details.host',
          select: 'profile.first_name profile.last_name station.on_air_name',
        })
          .then(dbShow => {
            dbShow._doc.show_details.title =
              dbShow.show_details.title + ' (Instance Version)';
            dbShow._doc.master_id =
              dbShow.master_show_uid + '-' + moment(dbShow.show_start_time_utc);
            // console.log(
            //   dbShow.master_show_uid + '-' + moment(dbShow.show_start_time_utc),
            // );
            console.log(dbShow);
            res.json(dbShow);
          })
          .catch(err => {
            console.error(err);
            res.status(422).json(err);
          });
      })
      .catch(err => res.status(422).json(err));
  });
}

module.exports = createInstance;
