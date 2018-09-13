const db = require('../models');

module.exports = {
  signin: (req, res) => {
    const { _id, email } = req.user;
    const currentUser = { _id, email };
    res.json(currentUser);
  },

  signout: (req, res) => {
    req.logout();
    res.json({ meesage: 'User Successfully Logged Out' })
  },

  current: (req, res) => {
    const { _id, email } = req.user;
    const currentUser = { _id, email };
    res.json(currentUser);
  }
}