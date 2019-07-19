const db = require('../../../models');
const { master_time_id__byShowType } = require('../utils/utils__mongoose');

async function remove(req, res) {
  //Set masterShow and any instance shows by the master_event_id to status: 'deleted'
  const shows = await db.Show.updateMany(
    { $or: [{ _id: req.params.id }, { master_event_id: req.params.id }] },
    {
      status: 'deleted',
    },
  );

  const returnedShow = await db.Show.findById({ _id: req.params.id });
  returnedShow.master_time_id = master_time_id__byShowType(returnedShow);
  res.json(returnedShow);
}

module.exports = remove;
