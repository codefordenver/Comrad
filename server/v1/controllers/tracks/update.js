const db = require('../../models');
const { validateEditData } = require('./utils');

function update(req, res) {
  validateEditData(req.body)
    .then(() =>
      db.Track.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      }),
    )
    .then(dbTrack => res.json(dbTrack))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
