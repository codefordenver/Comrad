const db = require('../../models');

function update(req, res) {
  const { body } = req;
  const { id } = req.params;
  //Need to refresh updated at
  db.Show.findOneAndUpdate({ _id: id }, body, { new: true })
    .populate('show_details.host', ['profile.first_name', 'profile.last_name'])
    .then(dbShow => res.json(dbShow))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
