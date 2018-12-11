const mongoose = require('mongoose');
const keys = require('../config/keys');
const seed = require('./data');
const db = require('../models');

async function seedDB() {
  try {
    mongoose.connect(
      keys.mongoURI,
      { useNewUrlParser: true }
    );

    await mongoose.connection.dropDatabase();

    // Users
    await Promise.all(seed.users.map(async user => await db.User.create(user)));

    // Artists
    await Promise.all(
      seed.artists.map(async artist => await db.Artist.create(artist))
    );

    // Albums
    await Promise.all(
      seed.albums.map(async albumSeed => {
        const artist = await db.Artist.findOne({
          name: albumSeed.album.artist,
        });
        albumSeed.album.artist = artist._id;
        const album = await db.Album.create(albumSeed.album);
        for (track of albumSeed.tracks) {
          track.album = album._id;
          if (!track.artists) {
            track.artists = [artist._id];
          }
          await db.Track.create(track);
        }
      })
    );

    // Announcements
    await Promise.all(
      seed.announcements.map(async announcement =>
        db.Announcement.create(announcement)
      )
    );

    // Features
    await Promise.all(
      seed.features.map(async feature => db.Feature.create(feature))
    );

    // Giveaways
    await Promise.all(
      seed.giveaway.map(async giveaway => db.Giveaway.create(giveaway))
    );

    // Shows
    await Promise.all(seed.show.map(async show => db.Show.create(show)));

    // Traffic
    await Promise.all(
      seed.traffic.map(async traffic => db.Traffic.create(traffic))
    );

    // Venue
    await Promise.all(seed.venue.map(async venue => db.Venue.create(venue)));
  } catch (err) {
    console.log(err);
  }
}

if (require.main === module) {
  seedDB()
    .then(() => {
      console.log('Seeded DB successfully!');
      process.exit();
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = seedDB;
