const db = require('../../models');

function find(req, res) {
  if (typeof req.query.host === 'undefined') {
    res.status(422).json({
      errorMessage: 'host parameter is required',
    });
    return;
  }

  return db.HostGroup.find({
    users: { $all: req.query.host, $size: req.query.host.length },
  })
    .then(dbHostGroups => res.json(dbHostGroups))
    .catch(err => res.status(422).json(err));
}

module.exports = find;
