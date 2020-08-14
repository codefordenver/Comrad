const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: { determineHostType, populateShowHost },
} = require('../utils');
const moment = require('moment');

function create(req, res) {
  const { body } = req;
  const { startDate, endDate } = body;
  const { eventType } = req.params;
  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  if (eventType === 'traffic') {
    // set the end date/time to the start date/time
    body.end_time_utc = body.start_time_utc;
  }

  //Determine if the repeat dropdown was set, convert to a JSON object.
  if (body.repeat_rule_dropdown_value) {
    let repeat_rule = JSON.parse(body.repeat_rule_dropdown_value);
    repeat_rule.repeat_start_date = body.repeat_rule.repeat_start_date;

    if (!body.repeat_end_date) {
      body.repeat_rule.repeat_end_date = moment('9999', 'YYYY');
    }
  } else {
    body.repeat_rule = {};
  }

  determineHostType(body)
    .then(body => {
      dbModel
        .create(body)
        .then(dbShow => {
          dbModel
            .populate(dbShow, populateShowHost())
            .then(dbShow => {
              res.json(eventList(dbShow, startDate, endDate));
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
    })
    .catch(err => {
      console.log('Error Creating Show, could not determine host type');
      console.error(err);
      res.status(422).json(err);
    });
}

module.exports = create;
