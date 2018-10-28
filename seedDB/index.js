const mongoose = require('mongoose');
const keys = require('../config/keys');
const artistSeeds = require('./data/artists.json');
const albumSeeds = require('./data/albums.json');
const userSeeds = require('./data/users.json');
const db = require('../models');

async function seedDB() {
  try {
    mongoose.connect(
      keys.mongoURI,
      { useNewUrlParser: true }
    );

    await mongoose.connection.dropDatabase();

    await Promise.all(userSeeds.map(async seed => await db.User.create(seed)));

    await Promise.all(
      artistSeeds.map(async seed => await db.Artist.create(seed))
    );

    await Promise.all(
      albumSeeds.map(async seed => {
        const artist = await db.Artist.findOne({ name: seed.album.artist });
        seed.album.artist = artist._id;
        const album = await db.Album.create(seed.album);
        for (track of seed.tracks) {
          track.album = album._id;
          if (!track.artists) {
            track.artists = [artist._id];
          }
          await db.Track.create(track);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

if (require.main === module) {
  seedDB()
    .then(process.exit)
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = seedDB;
