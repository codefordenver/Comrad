const db = require('../../models');

function login(req, res) {
  let userObj = req.user;

  delete userObj._doc.password;

  //add the user's host groups
  return db.HostGroup.find({ users: req.user._id })
    .then(result => {
      return res.json({ ...userObj.toObject(), host_groups: result });
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json({ errorMessage: err });
    });
}

module.exports = login;
