const db = require('../../models');

async function remove(req, res) {
  // const adminCount = await db.User.find({ permissions: 'Admin' }).count();

  const { id } = req.params;

  db.User.findById({ _id: id })
    .then(async dbUser => {
      // can only delete admin if there are more than one
      // if (
      //   permissions.find(item => item.toLowerCase() === 'admin') &&
      //   adminCount <= 1
      // ) {
      //   return res
      //     .status(404)
      //     .json({ message: 'Must have at least one Admin available' });
      // }

      // can only delete user if can_delete = true
      if (await !dbUser.canDelete()) {
        return res
          .status(404)
          .json({ message: 'User cannot be deleted from the database' });
      }

      return dbUser.remove();
    })
    .then(response => {
      if (typeof response.message === 'undefined') {
        response = response.forApiResponse();
        response = response.toObject();
      }

      res.json(response);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = remove;
