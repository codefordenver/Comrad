const {
  utils: { getModelForEventType },
} = require('../utils');
const { master_time_id__byShowType } = require('../utils/utils__mongoose');

async function remove(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  //Can turn this into the create + delete endpoint from series show
  //Set masterShow and any instance shows by the master_event_id to status: 'deleted'
  const show = await dbModel.updateOne(
    { _id: req.params.id },
    {
      status: 'deleted',
    },
  );

  const instance = await dbModel.findById({ _id: req.params.id });
  let returnedShow = { ...instance.toObject() };
  returnedShow.master_time_id = master_time_id__byShowType(returnedShow);
  console.log(returnedShow);
  res.json(returnedShow);
}

module.exports = remove;
