const db = require('../../../models/v1');
const { validateArtistData } = require('./utils');

async function createMany(req, res) {
  let artistPromises = [];
  let artistError = false;
  req.body.forEach(function(artist) {
    artistPromises.push(validateArtistData(artist));
    if (typeof artist.name == 'undefined') {
      res.status(422).json({
        errorMessage: 'name is required',
      });
      artistError = true;
    }
  });
  if (artistError) {
    return;
  }
  Promise.all(artistPromises)
    .then(values => {
      db.Artist.insertMany(values)
        .then(dbArtist => res.json(dbArtist))
        .catch(err => res.json(422).json(err));
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
      return;
    });
}

module.exports = createMany;
