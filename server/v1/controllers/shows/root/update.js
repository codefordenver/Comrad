const {
  utils: { getModelForEventType },
  utils__mongoose: {
    populateShowHost,
    populateMasterShow,
    master_time_id__byShowType,
  },
} = require('../utils');

function update(req, res) {
  const { body } = req;
  const { eventType, id } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  //Need to refresh updated at
  dbModel
    .findOneAndUpdate({ _id: id }, body, { new: true })
    .populate(populateShowHost())
    .populate(populateMasterShow())
    .then(dbShow => {
      dbShow._doc.master_time_id = master_time_id__byShowType(dbShow);
      res.json(dbShow);
    })
    .catch(err => {
      res.status(422).json(err);
    });
}

module.exports = update;
