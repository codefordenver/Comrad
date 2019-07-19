const db = require('../../../models');
const { master_time_id__byShowType } = require('../utils/utils__mongoose');

async function remove(req, res) {
  //Can turn this into the create + delete endpoint from series show
  //Set masterShow and any instance shows by the master_event_id to status: 'deleted'
  const show = await db.Show.updateOne(
    { _id: req.params.id },
    {
      status: 'deleted',
    },
  );

  const instance = await db.Show.findById({ _id: req.params.id });
  let returnedShow = { ...instance.toObject() };
  returnedShow.master_time_id = master_time_id__byShowType(returnedShow);
  console.log(returnedShow);
  res.json(returnedShow);
}

module.exports = remove;
