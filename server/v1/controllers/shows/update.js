const db = require('../../models');

const {
  utils: { master_time_id__byShowType },
  utils__mongoose: { populateShowQuery },
} = require('./utils');

function update(req, res) {
  const { body } = req;
  const { id } = req.params;
  //Need to refresh updated at
  db.Show.findOneAndUpdate({ _id: id }, body, { new: true })
    .populate(populateShowQuery())
    .then(dbShow => {
      dbShow._doc.master_time_id = master_time_id__byShowType(dbShow);
      res.json(dbShow);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = update;
