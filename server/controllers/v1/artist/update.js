const db = require('../../../models/v1');

function remove(req, res) {
  db.Artist.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbArtist => res.json(dbArtist))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
