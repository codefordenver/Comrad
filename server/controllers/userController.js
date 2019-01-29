const db = require('../models');
const Chance = require('chance');
const axios = require('axios');

const chance = new Chance();

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 *
 * @param {String} query
 * @returns {Object}
 */
function queryOptions(query) {
  const { q } = query;

  let queryObj = {};

  if (q) {
    const { q } = query;
    const re = new RegExp(splitQueryByWord(q), 'i');

    queryObj = { ...queryObj, $or: [{ first_name: re }] };
  }

  return queryObj;
}

/**
 * Return object with options to pass into Model.paginate({}) function
 * @param {String} query
 * @returns {Object}
 */
function searchOptions(query) {
  const { limit, order, page, sort } = query;

  let optionsObj = {};

  if (sort) {
    optionsObj = {
      ...optionsObj,
      sort: {
        [sort]: parseInt(order) || 1,
      },
    };
  }

  if (limit) {
    optionsObj = { ...optionsObj, limit: parseInt(limit) };
  }

  if (page) {
    optionsObj = { ...optionsObj, page: parseInt(page) };
  }

  return optionsObj;
}

/**
 * Splits a given query string into a regexp pattern string matching any word
 * in the source query.
 * @param {String} queryString
 * @returns {String}
 */
function splitQueryByWord(queryString) {
  return queryString
    .split(/\s+/)
    .map(word => `(${word})`)
    .join('|');
}

module.exports = {
  async findById(req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  async findAll(req, res) {
    db.User.find({})
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  },

  async findByActive(req, res) {
    const sort_by = req.query.sort_by ? req.query.sort_by : 'on_air_name';
    const status = req.params.status ? req.params.status : 'Active';
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const page = Math.max(0, Number(req.query.page));
    db.User.find({ status: status })
      .sort(sort_by)
      .limit(limit)
      .skip(limit * page)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  async search(req, res) {
    const { q } = req.query;
    const re = new RegExp(q, 'i');

    console.log(q);

    db.User.find({
      $or: [
        { first_name: re },
        { last_name: re },
        { email: re },
        { on_air_name: re },
      ],
    })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  },

  async create(req, res, next) {
    const { contact, password } = req.body;
    const { email } = contact;

    if (!email || !password) {
      return res
        .status(422)
        .json({ errorMessage: 'You must provide email and password' });
    }

    db.User.findOne({ email }, function(err, existingUser) {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422).json({ errorMessage: 'User already exists' });
      }

      db.User.create(req.body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json({ errorMessage: err.message }));
    });
  },

  async update(req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  updatePermission(req, res) {
    const { role } = req.body;

    // Only admins can update permissions
    if (req.user.role !== 'Admin') {
      return res
        .status(403)
        .json({ errorMessage: 'Must be admin to update permission' });
    }

    // Admin can't update their own permissions
    if (req.user.role === 'Admin' && role !== 'Admin') {
      return res.status(403).json({
        errorMessage:
          "Admin cannot remove it's own permissions, must use another Admin",
      });
    }

    // Validation to make sure Front-End sends correct JSON
    if (role === undefined) {
      return res.json({ errorMessage: 'Must enter valid role property' });
    }

    db.User.findOneAndUpdate({ _id: req.params.id }, { role }, { new: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  async remove(req, res) {
    const count = await db.User.find({ role: 'Admin' }).count();

    if (req.user.role !== 'Admin') {
      return res
        .status(403)
        .json({ errorMessage: 'Must be admin to delete user' });
    }

    db.User.findById({ _id: req.params.id })
      .then(dbUser => {
        // Can only delete Admin if there are more than one
        if (dbUser.role === 'Admin' && count === 1) {
          return { errorMessage: 'Must have at least one Admin available' };
        }

        // Can only delete user if can_delete = true
        if (!dbUser.can_delete) {
          return { errorMessage: 'User cannot be deleted from the database' };
        }

        return dbUser.remove();
      })
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  },

  async randomUser(req, res) {
    const gender = ['male', 'female'];
    const listOfPermissions = [
      'dj',
      'underwriting',
      'show_producer',
      'full_access',
      'admin',
    ];

    const randomGender = gender[Math.floor(Math.random() * gender.length)];
    const randomPermissions =
      listOfPermissions[Math.floor(Math.random() * listOfPermissions.length)];
    const randomString = chance.string(
      {
        pool:
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$',
      },
      {
        length: 10,
      },
    );

    const first_name = chance.first();
    const last_name = chance.last();
    const date_of_birth = chance.date({
      month: randomNumberGenerator(0, 11),
      day: randomNumberGenerator(0, 27),
      year: randomNumberGenerator(1970, 2018),
    });
    const image = await axios.get(
      `https://avatars.dicebear.com/v2/${randomGender}/${this.first_name +
        this.last_name}.svg`,
    );
    const street = `${chance.integer({
      min: 100,
      max: 99999,
    })} ${chance.street()}`;
    const city = chance.city();
    const state = chance.state();
    const zip_code = chance.zip();
    const phone = chance.phone({ formatted: false });
    const email = `${first_name}.${last_name}@mail.com`;
    const slack = `@${first_name + last_name}`;
    const on_air_name = `DJ ${first_name} ${last_name}`;
    const permissions = randomPermissions;
    const status = true;
    const can_delete = Math.random() >= 0.5;
    const registered = chance.date({
      month: randomNumberGenerator(0, 11),
      day: randomNumberGenerator(0, 27),
      year: randomNumberGenerator(2000, 2018),
    });
    const password = randomString;
    const fake_user_password = randomString;
    const reset_token = null;
    const reset_token_expiry = null;

    const userData = {
      first_name,
      last_name,
      date_of_birth,
      image: image.data,
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
        permissions,
        status,
        can_delete,
        registered,
      },
      password,
      fake_user_password,
      reset_token,
      reset_token_expiry,
    };

    console.log(userData);

    db.User.create(userData)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json({ errorMessage: err.message }));
  },
};
