const {
  utils: { eventList, getModelForEventType },
  utils__mongoose: {
    populateShowHost,
    populateMasterEvent,
    findEventQueryByDateRange,
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

  if (startDate && endDate) {
    let filter = {
      $and: [
        findEventQueryByDateRange(startDate, endDate)[0],
        {
          $or: [{ _id: id }, { master_event_id: id }],
        },
      ],
    };
    let showResults = await dbModel
      .find(filter)
      .populate(populateShowHost())
      .populate(populateMasterEvent())
      .catch(function(err) {
        console.log('error updating series:');
        console.log(err);
      });
    res.json(eventList(showResults, startDate, endDate));
  } else {
    return res.json(updateSeries);
  }
}

module.exports = update;
