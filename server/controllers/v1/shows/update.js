const db = require('../../../models/v1');

function update(req, res) {
  const { id } = req.params;
  const { data } = req.body;

  db.Show.findOneAndUpdate({ _id: id }, data, { new: true })
    .populate('show_details.host', ['profile.first_name', 'profile.last_name'])
    .then(dbShow => res.json(dbShow))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
