const db = require('../../models');

async function findAll(req, res) {
  db.AccessControl.find({})
    .then(dbAccessControl => {
      res.json(dbAccessControl);
    })
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = findAll;
