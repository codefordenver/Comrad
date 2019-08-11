const {
  utils: { showList, getModelForEventType },
  utils__mongoose: {
    populateShowHost,
    populateMasterShow,
    findShowQueryByDateRange,
  },
} = require('../utils');

async function update(req, res) {
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
  const updateSeries = await dbModel.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });

  const showDateFilter =
    startDate && endDate ? findShowQueryByDateRange(startDate, endDate) : {};

  const filter = {
    $and: [
      showDateFilter[0],
      {
        $or: [{ _id: id }, { master_event_id: id }],
      },
    ],
  };

  const showResults = await dbModel
    .find(filter)
    .populate(populateShowHost())
    .populate(populateMasterShow());

  res.json(showList(showResults, startDate, endDate));
}

module.exports = update;
