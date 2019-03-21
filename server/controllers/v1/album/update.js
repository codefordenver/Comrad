const db = require('../../../models/v1');

function update(req, res) {
  db.Album.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(dbAlbum => res.json(dbAlbum))
    .catch(err => res.status(422).json(err));
}

module.exports = update;
