const db = require('../../models');
const mongoose = require('mongoose');
const moment = require('moment');

const {
  utils__mongoose: { populateShowQuery, master_time_id },
} = require('./utils');

function createInstance(req, res) {
  const {
    show_start_time_utc,
    show_end_time_utc,
    show_details: { host },
  } = req.body;
  const { id } = req.params;

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
        db.Show.populate(dbShow, populateShowQuery())
          .then(dbShow => {
            let newDbShow = { ...dbShow.toObject() };
            newDbShow.show_details.title =
              dbShow.show_details.title + ' (Updated Host - Instance Version)';
            newDbShow.master_time_id = master_time_id(
              dbShow.master_show_uid,
              dbShow.replace_show_date,
            );
            res.json(newDbShow);
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
