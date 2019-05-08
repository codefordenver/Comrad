const db = require('../../models');

async function remove(req, res) {
  const count = await db.User.find({ 'station.permission': 'Admin' }).count();

  if (!req.user) {
    return res.status(403).json('Must be logged in to delete user');
  }

  const { permission } = req.user.station;

  if (permission !== 'Admin') {
    return res.status(403).json('Must be admin to delete user');
  }

  db.User.findById({ _id: req.params.id })
    .then(dbUser => {
      // Can only delete Admin if there are more than one
      if (dbUser.station.permission === 'Admin' && count === 1) {
        return 'Must have at least one Admin available';
      }

      // Can only delete user if can_delete = true
      if (!dbUser.station.can_delete) {
        return 'User cannot be deleted from the database';
      }

      return dbUser.remove();
    })
    .then(response => res.json(response))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
