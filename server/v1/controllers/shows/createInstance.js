const db = require('../../models');
const mongoose = require('mongoose');

const {
  utils__mongoose: { populateShowHost, populateMasterShow, master_time_id },
} = require('./utils');

function createInstance(req, res) {
  const {
    start_time_utc,
    end_time_utc,
    show_details: { host },
  } = req.body;
  const { id } = req.params;

  db.Show.findById(id).exec(function(err, doc) {
    let d1 = doc;
    d1._id = mongoose.Types.ObjectId();
    d1.master_event_id = id;
    d1.show_details.host = host;
    d1.start_time_utc = start_time_utc;
    d1.end_time_utc = end_time_utc;
    d1.repeat_rule.repeat_start_date = start_time_utc;
    d1.repeat_rule.repeat_end_date = end_time_utc;
    d1.end_time_utc = end_time_utc;
    d1.replace_event_date = start_time_utc;
    d1.is_recurring = false;
    d1.created_at = Date.now();
    d1.updated_at = Date.now();
    d1.isNew = true;
    d1.save()
      .then(dbShow => {
        db.Show.populate(dbShow, populateShowHost()).then(dbShow => {
          db.Show.populate(dbShow, populateMasterShow())
            .then(dbShow => {
              let newDbShow = { ...dbShow.toObject() };
              newDbShow.show_details.title =
                dbShow.show_details.title +
                ' (Updated Host - Instance Version)';
              newDbShow.master_time_id = master_time_id(
                dbShow.master_event_id._id,
                dbShow.replace_event_date,
              );
              res.json(newDbShow);
            })
            .catch(err => {
              res.status(422).json(err);
            });
        });
      })
      .catch(err => res.status(422).json(err));
  });
}

module.exports = createInstance;
