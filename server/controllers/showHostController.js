const db = require('../models/v1');

module.exports = {
  update: (req, res) => {
    const id = req.params.id;
    const { host } = req.body;

    db.Show.findOneAndUpdate(
      { _id: id },
      { $set: { 'show_details.host': host } },
      { new: true },
    )
      .populate('show_details.host', [
        'profile.first_name',
        'profile.last_name',
      ])
      .then(dbShow => {
        res.json(dbShow);
      })
      .catch(err => res.status(422).json(err));
  },
};
