const db = require('../../../models/v1');

function updatePermissions(req, res) {
  const { role } = req.body;

  // Only admins can update permissions
  if (req.user.role !== 'Admin') {
    return res
      .status(403)
      .json({ errorMessage: 'Must be admin to update permission' });
  }

  // Admin can't update their own permissions
  if (req.user.role === 'Admin' && role !== 'Admin') {
    return res.status(403).json({
      errorMessage:
        "Admin cannot remove it's own permissions, must use another Admin",
    });
  }

  // Validation to make sure Front-End sends correct JSON
  if (role === undefined) {
    return res.json({ errorMessage: 'Must enter valid role property' });
  }

  db.User.findOneAndUpdate({ _id: req.params.id }, { role }, { new: true })
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
}

module.exports = updatePermissions;
