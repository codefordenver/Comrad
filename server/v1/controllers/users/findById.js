const db = require('../../models');

function findById(req, res) {
  const { id } = req.params;

  db.User.findById(id)
    .then(async dbUser => {
      dbUser.can_delete = await dbUser.canDelete();

      delete dbUser._doc.password;

      res.json(dbUser);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
