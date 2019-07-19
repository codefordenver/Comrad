const mongoose = require('mongoose');

const {
  utils: { getModelForEventType },
  utils__mongoose: { populateShowHost, populateMasterShow, master_time_id },
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
        dbModel.populate(dbShow, populateShowHost()).then(dbShow => {
          dbModel
            .populate(dbShow, populateMasterShow())
            .then(dbShow => {
              let returnedShow = { ...dbShow.toObject() };
              const {
                master_event_id,
                replace_event_date,
                show_details,
              } = dbShow;

              returnedShow.show_details.title =
                show_details.title + ' (Updated Host - Instance Version)';

              returnedShow.master_event_id = master_event_id
                ? master_event_id._id
                : null;

              returnedShow.master_time_id = master_time_id(
                returnedShow.master_event_id,
                replace_event_date,
              );
              res.json(returnedShow);
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
