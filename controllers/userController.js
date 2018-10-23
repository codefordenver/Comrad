const db = require('../models');

module.exports = {
  findById: (req, res) => {
    db.User.findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    db.User.find({})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  find: (req, res) => {
    const sort_by = req.params.sort_by ? req.params.sort_by : "on_air_name";
    db.User.find({})
      .sort(sort_by)
      .limit(10)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  findActive: (req, res) => {
    db.User.find({status: "Active"})
      .sort("on_air_name")
      .limit(10)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  findInactive: (req, res) => {
    db.User.find({status: "Inactive"})
      .sort("on_air_name")
      .limit(10)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },


  create: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(422)
        .json({ error: 'You must provide email and password' });
    }

    db.User.findOne({ email }, function(err, existingUser) {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422).json({ error: 'User already exists' });
      }

      db.User.create(req.body)
        .then(dbUser => res.json(dbUser))
        .catch(err => res.status(422).json(err));
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
    if(req.user.role !== 'Admin') {
      return res.json({ errorMessage: 'Must be admin to update permission' });
    }

    // Admin can't update their own permissions
    if(req.user.role === 'Admin' && role !== 'Admin') {
      return res.json({ errorMessage: 'Admin cannot remove it\'s own permissions, must use another Admin' })
    }

    // Validation to make sure Front-End sends correct JSON
    if(role === undefined) {
      return res.json({ errorMessage: 'Must enter valid role property' })
    }

    db.User.findOneAndUpdate({ _id: req.params.id }, { role }, { new: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  remove: async (req, res) => {
    const count = await db.User.find({ role: 'Admin' }).count();

    if(req.user.role !== 'Admin') {
      return res.json({ errorMessage: 'Must be admin to delete user' });
    }

    db.User.findById({ _id: req.params.id })
      .then(dbUser => {

        // Can only delete Admin if there are more than one
        if(dbUser.role === 'Admin' && count === 1) {
          return { errorMessage: 'Must have at least one Admin available' }
        }

        // Can only delete user if can_delete = true
        if(!dbUser.can_delete) {
          return { errorMessage: 'User cannot be deleted from the database' }
        }

        return dbUser.remove()
      })
      .then(response => res.json(response))
      .catch(err => res.status(422).json(err));
  }
};
