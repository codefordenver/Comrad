const db = require('../../models');

function findById(req, res) {
  db.User.findById(req.params.id)
    .then(dbUser => {
      const { _id, contact, location, profile, station } = dbUser;
      const userObj = { _id, ...contact, ...location, ...profile, ...station };

      res.json(userObj);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = findById;
