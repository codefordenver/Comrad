const db = require('../../models');

function canDelete(req, res) {
  const { id } = req.query;

  db.User.findById(id)
    .then(async dbUser => {
      res.json(await dbUser.canDelete());
    })
    .catch(err => res.status(422).json(err));
}

module.exports = canDelete;
