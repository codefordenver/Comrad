const db = require('../../models');

function create(req, res) {
  const {
    // required
    email,
    first_name,
    last_name,
    password,

    // optional
    can_delete = true,
    on_air_name = null,
    permissions = ['DJ'],
    primary_phone = null,
    reset_token = null,
    reset_token_expiry = null,
    status = 'Active',
  } = req.body;

  const userObj = {
    can_delete,
    email,
    first_name,
    last_name,
    on_air_name,
    password,
    permissions,
    primary_phone,
    reset_token,
    reset_token_expiry,
    status,
  };

  db.User.create(userObj)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json({ message: err }));
}

module.exports = create;
