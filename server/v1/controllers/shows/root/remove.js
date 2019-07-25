const {
  utils: { getModelForEventType },
  utils__mongoose: { master_time_id__byShowType },
} = require('../utils');

async function remove(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  const show = await dbModel.updateOne(
    { _id: req.params.id },
    {
      status: 'deleted',
    },
  );

  const removedShow = await dbModel.findById({ _id: req.params.id }).lean();
  removedShow.master_time_id = master_time_id__byShowType(removedShow);
  res.json(removedShow);
}

module.exports = remove;
