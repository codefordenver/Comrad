const db = require('../../models');

function update(req, res) {
  return db.HostGroup.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(dbHostGroup =>
      dbHostGroup.populate('users', { on_air_name: 1, _id: 1 }),
    )
    .then(dbHostGroup => res.json(dbHostGroup))
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
    });
}

module.exports = update;
