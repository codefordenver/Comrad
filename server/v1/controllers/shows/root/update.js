const {
  utils: { showList, getModelForEventType },
  utils__mongoose: { populateShowHost, populateMasterShow },
} = require('../utils');

function update(req, res) {
  const { body } = req;
  let {
    body: { startDate, endDate },
  } = req;
  const { eventType, id } = req.params;

  startDate = startDate ? startDate : null;
  endDate = endDate ? endDate : null;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  //Need to refresh updated at
  dbModel
    .findOneAndUpdate({ _id: id }, body, { new: true })
    .populate(populateShowHost())
    .populate(populateMasterShow())
    .then(dbShow => {
      res.json(showList(dbShow, startDate, endDate));
    })
    .catch(err => {
      res.status(422).json(err);
    });
}

module.exports = update;
