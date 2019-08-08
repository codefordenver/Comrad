const db = require('../../models');

function findAll(req, res) {
  db.User.find({})
    .then(dbUsers => {
      dbUsers.forEach(user => delete user._doc.password);

      res.json(dbUsers);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = findAll;
