const {
  utils: { getModelForEventType },
  utils__mongoose: { master_time_id__byShowType },
} = require('../utils');

function remove(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  dbModel
    .findById({ _id: req.params.id })
    .then(dbShow => dbShow.remove())
    .then(dbShow => {
      let returnedShow = { ...dbShow.toObject() };
      returnedShow.master_time_id = master_time_id__byShowType(returnedShow);
      res.json(returnedShow);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
