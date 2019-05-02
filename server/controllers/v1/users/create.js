const db = require('../../../models/v1');

function create(req, res) {
  const {
    // required
    email,
    first_name,
    last_name,
    password,

    // optional
    can_delete = true,
    city = null,
    date_of_birth = null,
    on_air_name = null,
    permission = 'DJ',
    phone = null,
    state = null,
    status = 'Active',
    street = null,
    zip_code = null,
  } = req.body;

  const userObj = {
    profile: {
      first_name,
      last_name,
      date_of_birth,
    },
    location: {
      street,
      city,
      state,
      zip_code,
    },
    contact: {
      phone,
      email,
    },
    station: {
      on_air_name,
      permission,
      status,
      can_delete,
    },
    auth: {
      password,
    },
  };

  console.log(userObj);

  db.User.create(userObj)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
