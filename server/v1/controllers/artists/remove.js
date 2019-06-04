const db = require('../../models');

function remove(req, res) {
  db.Artist.findById({ _id: req.params.id })
    .then(dbArtist => dbArtist.remove())
    .then(dbArtist => res.json(dbArtist))
    .catch(err => res.status(422).json(err));
}

module.exports = remove;
