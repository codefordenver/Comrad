const db = require('../../models');

function current(req, res) {
  if (req.user) {
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

  res.send(false);
}

module.exports = current;
