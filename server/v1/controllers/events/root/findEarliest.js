const {
  utils: { getModelForEventType },
  utils__mongoose: { populateMasterEvent },
} = require('../utils');

function findEarliest(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  return dbModel
    .find({ 'traffic_details.type': req.query.type }, null, {
      sort: { start_date_utc: 1 },
      limit: 1,
    })
    .populate(populateMasterEvent())
    .then(result => res.json(result[0]))
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = findEarliest;
