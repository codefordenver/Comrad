const db = require('../../models');

function findById(req, res) {
  const { id } = req.params;

  db.Role.findById(id)
    .then(dbRole => {
      delete dbRole._doc.password;

      res.json(dbRole);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = findById;
