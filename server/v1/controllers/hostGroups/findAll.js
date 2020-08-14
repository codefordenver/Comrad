const db = require('../../models');

function findAll(req, res) {
  return db.HostGroup.find({}, null, { sort: { on_air_name: 1 } })
    .then(dbHostGroups => res.json(dbHostGroups))
    .catch(err => res.status(422).json(err));
}

module.exports = findAll;
