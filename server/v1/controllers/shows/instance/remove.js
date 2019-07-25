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

  //Create show with status 'deleted' and then return it to the front end.
  const { start_time_utc, end_time_utc } = req.body;
  const { id } = req.params;

  const seriesData = await dbModel.findOne({ _id: id }).lean();

  if (seriesData._id) {
    const newInstance = {
      master_event_id: seriesData._id,
      status: 'deleted',
      start_time_utc: start_time_utc,
      end_time_utc: end_time_utc,
      repeat_rule: {
        repeat_start_date: start_time_utc,
        repeat_end_date: end_time_utc,
      },
      replace_event_date: start_time_utc,
      is_recurring: false,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    const show = await dbModel.create(newInstance);
    let returnedShow = show.toObject();
    returnedShow.master_time_id = master_time_id__byShowType(returnedShow);
    res.json(returnedShow);
  } else {
    res.json('The series show does not exist');
  }
}

module.exports = remove;
