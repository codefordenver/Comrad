const db = require('../../models');

async function remove(req, res) {
  const adminCount = await db.User.find({ permissions: 'Admin' }).count();

  if (!req.user) {
    return res
      .status(403)
      .json({ message: 'User must be logged in to delete' });
  }

  const { permissions } = req.user;

  if (!permissions.find(item => item.toLowerCase() === 'admin')) {
    return res.status(403).json('Must be admin to delete user');
  }

  const { id } = req.params;

  db.User.findById({ _id: id })
    .then(dbUser => {
      // can only delete admin if there are more than one
      if (
        permissions.find(item => item.toLowerCase() === 'admin') &&
        adminCount <= 1
      ) {
        return res
          .status(404)
          .json({ message: 'Must have at least one Admin available' });
      }

      // can only delete user if can_delete = true
      if (!dbUser.can_delete) {
        return res
          .status(404)
          .json({ message: 'User cannot be deleted from the database' });
      }

      return dbUser.remove();
    })
    .then(response => res.json(response))
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = remove;
