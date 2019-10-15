const mongoose = require('mongoose');

const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: { populateShowHost, populateMasterEvent, master_time_id },
} = require('../utils');

function createInstance(req, res) {
  const {
    start_time_utc,
    end_time_utc,
    show_details: { host },
  } = req.body;
  const { id, eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  dbModel.findById(id).exec(function(err, doc) {
    let d1 = doc;
    d1._id = mongoose.Types.ObjectId();
    d1.master_event_id = id;
    //Set show_details to an empty object first so it will inherit any updates on the master series
    d1.show_details = {};
    //Add only the new host if available
    d1.show_details.host = host;
    //Fill in remaining time details of instance
    d1.start_time_utc = start_time_utc;
    d1.end_time_utc = end_time_utc;
    d1.repeat_rule.repeat_start_date = start_time_utc;
    d1.repeat_rule.repeat_end_date = end_time_utc;
    d1.replace_event_date = start_time_utc;
    d1.is_recurring = false;
    d1.created_at = Date.now();
    d1.updated_at = Date.now();
    d1.isNew = true;
    d1.save()
      .then(dbShow => {
        //query the database for the new record: dbShow will not be correct, because it
        //sets an array for "guests" rather than leaving "guests" as undefined (the array's
        //default value)
        dbModel.findOne({ _id: dbShow._id }).then(dbShow => {
          dbModel.populate(dbShow, populateShowHost()).then(dbShow => {
            dbModel
              .populate(dbShow, populateMasterEvent())
              .then(dbShow => {
                res.json(eventList(dbShow, start_time_utc, end_time_utc));
              })
              .catch(err => {
                res.status(422).json(err);
              });
          });
        });
      })
      .catch(err => res.status(422).json(err));
  });
}

module.exports = createInstance;
