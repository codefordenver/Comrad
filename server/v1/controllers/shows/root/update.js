const db = require('../../../models');

const {
  utils: { showList },
  utils__mongoose: {
    populateShowHost,
    populateMasterShow,
    master_time_id__byShowType,
  },
} = require('../utils');

function update(req, res) {
  const { body } = req;
  let {
    body: { startDate, endDate },
  } = req;
  const { id } = req.params;
  console.log(body);
  startDate = startDate ? startDate : null;
  endDate = endDate ? endDate : null;

  //Need to refresh updated at
  db.Show.findOneAndUpdate({ _id: id }, body, { new: true })
    .populate(populateShowHost())
    .populate(populateMasterShow())
    .then(dbShow => {
      res.json(showList(dbShow, startDate, endDate));
    })
    .catch(err => {
      res.status(422).json(err);
    });
}

module.exports = update;
