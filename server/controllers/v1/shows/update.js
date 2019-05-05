const db = require('../../../models/v1');
const { formatShow } = require('./utils');

function update(req, res) {
  const { id } = req.params;
  const { data } = req.body;

  db.Show.findOneAndUpdate({ _id: id }, formatShow(data), { new: true })
    .populate('show_details.host', ['profile.first_name', 'profile.last_name'])
    .then(dbShow => res.json(dbShow))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
