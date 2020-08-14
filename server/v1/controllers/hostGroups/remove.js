const db = require('../../models');

function remove(req, res) {
  return db.HostGroup.findOne({ _id: req.params.id })
    .then(hostGroupData => {
      return db.Show.findOne({
        'show_details.host': req.params.id,
        'show_details.host_type': 'HostGroup',
      })
        .then(showReferencingHostGroup => {
          if (showReferencingHostGroup != null) {
            throw 'This host group cannot be deleted because it is used for a show.';
          }
          hostGroupData
            .remove()
            .then(removeData => res.json(hostGroupData))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = remove;
