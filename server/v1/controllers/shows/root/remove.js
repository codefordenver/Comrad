const db = require('../../../models');
const { master_time_id__byShowType } = require('../utils/utils__mongoose');

async function remove(req, res) {
  const show = await db.Show.updateOne(
    { _id: req.params.id },
    {
      status: 'deleted',
    },
  );

  const removedShow = await db.Show.findById({ _id: req.params.id }).lean();
  removedShow.master_time_id = master_time_id__byShowType(removedShow);
  res.json(removedShow);
}

module.exports = remove;
