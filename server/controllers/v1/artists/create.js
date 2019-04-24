const db = require('../../../models/v1');
const { validateArtistData } = require('./utils');

async function create(req, res) {
  if (typeof req.body.name === 'undefined') {
    res.status(422).json({
      errorMessage: 'name is required',
    });
    return;
  }
  validateArtistData(req.body)
    .then(artistData => {
      db.Artist.create(artistData)
        .then(dbArtist => res.json(dbArtist))
        .catch(err => res.status(422).json(err));
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
    });
}

module.exports = create;
