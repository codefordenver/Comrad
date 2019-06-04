const db = require('../../models');
const { validateArtistData } = require('./utils');

function remove(req, res) {
  validateArtistData(req.body, req.params.id)
    .then(updateTo => {
      updateTo.updated_at = Date.now();
      db.Artist.findOneAndUpdate({ _id: req.params.id }, updateTo, {
        new: true,
      })
        .then(dbArtist => res.json(dbArtist))
        .catch(err => res.status(422).json(err));
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
      return;
    });
}

module.exports = remove;
