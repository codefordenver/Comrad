const axios = require('axios');
const db = require('../../../models/v1');
const { randArrItem, randNumGen } = require('../../../utils');
const Chance = require('chance');

const USER_GENDERS = ['male', 'female'];
const USER_PERMISSIONS = [
  'dj',
  'underwriting',
  'show_producer',
  'full_access',
  'admin',
];
const USER_STATUS = ['active', 'inactive'];
const STRING_POOL =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$';

async function randomUser(req, res) {
  const chance = new Chance();

  const randGender = randArrItem(USER_GENDERS);
  const randPermissions = randArrItem(USER_PERMISSIONS);
  const randStatus = randArrItem(USER_STATUS);
  const randString = chance.stringI({ pool: STRING_POOL }, { length: 10 });

  // Proile
  const first_name = chance.first();
  const last_name = chance.last();
  const date_of_birth = chance.date({
    month: randNumGen(0, 11),
    day: randNumGen(0, 27),
    year: randNumGen(1970, 2018),
  });
  const image = await axios.get(
    `https://avatars.dicebear.com/v2/${randGender}/${first_name +
      last_name}.svg`,
  );

  // Location
  const street = `${randNumGen(100, 9999)} ${chance.street()}`;
  const city = chance.city();
  const state = chance.state();
  const zip_code = chance.zip();

  // Contact
  const phone = chance.phone({ formatted: false });
  const email = `${first_name + last_name}@mail.com`;
  const slack = `@${first_name + last_name}`;

  // Station
  const on_air_name = `DJ ${first_name} ${last_name}`;
  const permission = randPermissions;
  const status = randStatus;
  const can_delete = Math.random() >= 0.5;
  const registered = chance.date({
    month: randNumGen(0, 11),
    day: randNumGen(0, 27),
    year: randNumGen(2000, 2018),
  });

  // Auth
  const password = randString;
  const fake_user_password = randString;
  const reset_token = null;
  const reset_token_expiry = null;

  const userData = {
    profile: {
      first_name,
      last_name,
      date_of_birth,
      image: image.data,
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
      slack,
    },
    station: {
      on_air_name,
      permission,
      status,
      can_delete,
      registered,
    },
    auth: {
      password,
      fake_user_password,
      reset_token,
      reset_token_expiry,
    },
  };

  db.User.create(userData)
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json({ errorMessage: err.message }));
}

module.exports = randomUser;
