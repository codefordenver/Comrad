const db = require('../../models');

async function findArtistAlbums(req, res) {
  db.Album.find({ artist: req.params.id }, {}, { sort: 'name' })
    .then(async dbAlbum => {
      const results = await Promise.all(
        dbAlbum.map(async album => {
          const numberOfTracks = await db.Track.countDocuments({
            album: album._id,
          });
          let modifiedAlbum = {
            ...album._doc,
            number_of_tracks: numberOfTracks,
          };
          return modifiedAlbum;
        }),
      );
      res.json(results);
    })
    .catch(err => res.status(422).json(err));
}

module.exports = findArtistAlbums;
