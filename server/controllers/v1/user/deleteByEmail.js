const db = require('../../../models/v1');

function deleteByEmail(req, res) {
  const { email } = req.body;

  db.User.findOne({ 'contact.email': email })
    .then(dbUser => {
      dbUser.remove();
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
}

module.exports = deleteByEmail;
