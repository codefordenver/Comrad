const db = require('../../models');
const { randArrItem } = require('../../utils');
const Chance = require('chance');

const USER_PERMISSIONS = [
  'DJ',
  'Underwriting',
  'Show Captain',
  'Full Access',
  'Admin',
];
const USER_STATUS = ['Active', 'Inactive'];
const STRING_POOL =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$';

function randomUser(req, res) {
  const chance = new Chance();

  const randPermissions = randArrItem(USER_PERMISSIONS);
  const randStatus = randArrItem(USER_STATUS);
  const randString = chance.string({ pool: STRING_POOL }, { length: 10 });

  const first_name = chance.first();
  const last_name = chance.last();
  const on_air_name = `DJ ${first_name} ${last_name}`;
  const password = randString;
  const permissions = [randPermissions];
  const primary_phone = chance.phone({ formatted: false });
  const status = randStatus;
  const reset_token = null;
  const reset_token_expiry = null;
  const email = `${first_name}.${last_name}@mail.com`;

  const userObj = {
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
    .catch(err => res.status(422).json(err));
}

module.exports = randomUser;
