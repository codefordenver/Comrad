const db = require('../models');
const jwt = require('jwt-simple');
const key = process.env.SECRET_KEY;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, key);
}

module.exports = {
  findById: (req, res) => {
    db.User
      .findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  findAll: (req, res) => {
    
    db.User
      .find({})
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  
  signup: (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(422).json({ error: 'You must provid email and password' })
    }

    db.User.findOne({ email }, function(err, existingUser) {
      if(err) {
        return next(err);
      }

      if(existingUser) {
        return res.status(422).json({ erro: 'User already exists'})
      }

      db.User
        .create(req.body)
        .then(dbUser => res.json({ token: tokenForUser(dbUser) }))
        .catch(err => res.status(422).json(err));
    });
  },

  signin: (req, res) => {
    console.log(req.user);
    res.json({ token: tokenForUser(req.user) });
  },

  update: (req, res) => {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },

  remove: (req, res) => {
    db.User
      .findById({ _id: req.params.id })
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
}