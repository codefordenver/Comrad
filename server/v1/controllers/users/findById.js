const db = require('../../models');

function findById(req, res) {
  const { id } = req.params;

  db.User.findById(id)
    .then(async dbUser => {
      dbUser = dbUser.forApiResponse();
      let canDelete = await dbUser.canDelete();
      dbUser = dbUser.toObject();
      dbUser.can_delete = canDelete;

      //add the user's host groups
      return db.HostGroup.find({ users: dbUser._id })
        .then(result => {
          return res.json({ ...dbUser, host_groups: result });
        })
        .catch(err => {
          console.error(err);
          return res.status(422).json({ errorMessage: err });
        });
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json({ errorMessage: err });
    });
}

module.exports = findById;
