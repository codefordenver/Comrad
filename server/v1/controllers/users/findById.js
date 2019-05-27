const db = require('../../models');

function findById(req, res) {
  const { id } = req.params;

  db.User.findById(id)
    .then(dbUser => {
      delete dbUser._doc.password;

      res.json(dbUser);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = findById;
