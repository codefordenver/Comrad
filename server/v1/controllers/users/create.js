const db = require('../../models');

function create(req, res) {
  // ensure there is not another user with the same email in the database
  return db.User.findOne({ email: req.body.email })
    .then(duplicateUser => {
      if (duplicateUser != null) {
        return res.status(422).json({
          errorMessage: 'A user with this email address already exists.',
        });
      }
      return db.User.create(req.body)
        .then(dbUser => res.json(dbUser))
        .catch(err => {
          console.log(err);
          return res
            .status(500)
            .json({ errorMessage: 'An unknown error occurred' });
        });
    })
    .catch(err => {
      console.log(err);
      return res
        .status(500)
        .json({ errorMessage: 'An unknown error occurred' });
    });
}

module.exports = create;
