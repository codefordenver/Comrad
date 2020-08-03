const db = require('../../models');

function findById(req, res) {
  return db.HostGroup.findOne({ _id: req.params.id })
    .populate('users', { _id: 1, on_air_name: 1 })
    .then(hostGroupData => res.json(hostGroupData))
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = findById;
