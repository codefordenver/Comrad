const db = require('../../models');

function findById(req, res) {
  const { id } = req.params;

  db.Permission.findById(id)
    .then(dbPermission => {
      delete dbPermission._doc.password;

      res.json(dbPermission);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = findById;
