const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: { populateMasterEvent },
} = require('../utils');
const moment = require('moment');

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
        let showResults = eventList(dbEvent, timestamp, timestamp + 1);
        res.json(showResults[0]);
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
