const db = require('../../models');

function create(req, res) {
  if (typeof req.body.on_air_name === 'undefined') {
    res.status(422).json({
      errorMessage: 'on_air_name is required',
    });
    return;
  }
  if (typeof req.body.hosts === 'undefined' || req.body.hosts.length === 0) {
    res.status(422).json({
      errorMessage: 'hosts is required',
    });
    return;
  }

  return db.HostGroup.create(req.body)
    .then(dbHostGroup => res.json(dbHostGroup))
    .catch(err => res.status(422).json(err));
}

module.exports = create;
