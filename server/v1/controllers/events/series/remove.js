const {
  utils: { getModelForEventType },
  utils__mongoose: { master_time_id__byEventType },
} = require('../utils');

async function remove(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  //Set masterShow and any instance shows by the master_event_id to status: 'deleted'
  const shows = await dbModel.updateMany(
    { $or: [{ _id: req.params.id }, { master_event_id: req.params.id }] },
    {
      status: 'deleted',
    },
  );

  const seriesShow = await dbModel.findById({ _id: req.params.id }).lean();
  seriesShow.master_time_id = master_time_id__byEventType(seriesShow);
  res.json(seriesShow);
}

module.exports = remove;
