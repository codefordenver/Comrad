const db = require('../../models');

function create(req, res) {
  if (typeof req.body.on_air_name === 'undefined') {
    res.status(422).json({
      errorMessage: 'on_air_name is required',
    });
    return;
  }
  if (typeof req.body.users === 'undefined' || req.body.users.length === 0) {
    res.status(422).json({
      errorMessage: 'users is required',
    });
    return;
  }

  return db.HostGroup.create(req.body)
    .then(dbHostGroup => res.json(dbHostGroup))
    .catch(err => {
      console.error(err);
      return res.status(422).json({ message: 'Error creating host group' });
    });
}

module.exports = create;
