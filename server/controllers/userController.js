const db = require('../models');

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
  findById: (req, res) => {
    db.User.findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  async findAll(req, res) {
    db.User.find({})
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json(err));
  },

  findByActive: (req, res) => {
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
    const { query } = req;

    const optionsObj = searchOptions(query);
    const queryObj = queryOptions(query);

    db.User.paginate(queryObj, optionsObj)
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(422).json({ message: err }));
  },

  create: (req, res, next) => {
    const { email, password } = req.body;

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

  update: (req, res) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  updatePermission: (req, res) => {
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

  remove: async (req, res) => {
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
};
