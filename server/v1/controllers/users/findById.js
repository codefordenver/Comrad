const db = require('../../models');

function findById(req, res) {
  const { id } = req.params;

  db.User.findById(id)
    .then(async dbUser => {
      dbUser.can_delete = await dbUser.canDelete();

      delete dbUser._doc.password;

      //add the user's host groups
      return db.HostGroup.find({ users: dbUser._id })
        .then(result => {
          return res.json({ ...dbUser.toObject(), host_groups: result });
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
