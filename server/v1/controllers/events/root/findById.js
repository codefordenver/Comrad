const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: { populateMasterEvent },
} = require('../utils');

function findById(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  if (req.params.id.indexOf('-') !== -1) {
    //we are looking for a master time id
    let idParts = req.params.id.split('-');
    return dbModel
      .find({ $or: [{ _id: idParts[0] }, { master_event_id: idParts[0] }] })
      .populate(populateMasterEvent())
      .then(dbEvent => {
        let timestamp = Number(idParts[1]);

        /* must do one hour each direction because rrule does not handle Daylight Savings properly for its .between implementation */
        let showResults = eventList(
          dbEvent,
          timestamp - 1 - 60 * 60 * 1000,
          timestamp + 60 * 60 * 1000 + 1,
        );
        /* example of what's causing the problem that requires an hour each way:
          1. have an event with this rrule:
            { byweekday: [ 'WE' ],
            repeat_start_date: 2019-01-09T15:00:00.000Z,
            frequency: 2,
            repeat_end_date: 2019-12-25T15:00:00.000Z }
          2. Change your computer time to 11/7/19, Mountain Standard Time
          3. Try to get an event that repeats on 10/30/2019 (timestamp of 1572444000000)
          4. rrule.between won't return a date unless you use 15:00 UTC instead (that timestamp is 14:00 UTC, which is when the event should be because of daylight savings adjustment
        */
        /* be sure we are returning the result with the matching master_time_id */
        let result = showResults[0];
        showResults.forEach(function(event) {
          if (event.master_time_id === req.params.id) {
            result = event;
          }
        });
        res.json(result);
      })
      .catch(err => {
        console.error(err);
        return res.status(422).json(err);
      });
  } else {
    //we are just looking for a plain id
    return dbModel
      .findById(req.params.id)
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(422).json(err));
  }
}

module.exports = findById;
