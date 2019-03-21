const db = require('../../../models/v1');

async function remove(req, res) {
  const count = await db.User.find({ role: 'Admin' }).count();

  if (req.user.role !== 'Admin') {
    return res
      .status(403)
      .json({ errorMessage: 'Must be admin to delete user' });
  }

  db.User.findById({ _id: req.params.id })
    .then(dbUser => {
      // Can only delete Admin if there are more than one
      if (dbUser.role === 'Admin' && count === 1) {
        return { errorMessage: 'Must have at least one Admin available' };
      }

      // Can only delete user if can_delete = true
      if (!dbUser.can_delete) {
        return { errorMessage: 'User cannot be deleted from the database' };
      }

      return dbUser.remove();
    })
    .then(response => res.json(response))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
