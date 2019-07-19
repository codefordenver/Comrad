const db = require('../../../models');
const { master_time_id__byShowType } = require('../utils/utils__mongoose');

function remove(req, res) {
  db.Show.findById({ _id: req.params.id })
    .then(dbShow => dbShow.remove())
    .then(dbShow => {
      let returnedShow = { ...dbShow.toObject() };
      returnedShow.master_time_id = master_time_id__byShowType(returnedShow);
      res.json(returnedShow);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
