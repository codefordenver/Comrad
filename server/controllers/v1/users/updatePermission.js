const db = require('../../../models/v1');

function updatePermission(req, res) {
  const { newPermission } = req.body;

  if (!req.user) {
    return res.status(403).json('Mst be logged in to update');
  }

  const { permission } = req.user.station;

  // Only admins can update permissions
  if (permission !== 'Admin') {
    return res.status(403).json('Must be admin to update permission');
  }

  // Validation to make sure Front-End sends correct JSON
  if (permission === undefined) {
    return res.json('Must enter valid role property');
  }

  db.User.findOneAndUpdate(
    { _id: req.params.id },
    { 'station.permission': newPermission },
    { new: true },
  )
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
}

module.exports = updatePermission;
