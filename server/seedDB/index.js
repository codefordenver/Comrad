const mongoose = require('mongoose');
const keys = require('../config/keys');
const seed = require('./data');
const db = require('../models');

async function seedDB() {
  try {
    mongoose.connect(
      keys.mongoURI,
      { useNewUrlParser: true },
    );

    await mongoose.connection.dropDatabase();

    // Users
    await Promise.all(seed.users.map(async user => await db.User.create(user)));

    // Artists
    let bulkOperations = [];
    seed.artists.forEach(function(artist) {
      bulkOperations.push({
          "insertOne": {
            "document": artist
          }
        });
    });
    await db.Artist.bulkWrite(bulkOperations);
    
    // Albums
    bulkOperations = [];
    seed.albums.forEach(function(album) {
      bulkOperations.push({
          "insertOne": {
            "document": album
          }
        });
    });
    await db.Album.bulkWrite(bulkOperations);
    
    // Tracks
    bulkOperations = [];
    seed.tracks.forEach(function(track) {
      bulkOperations.push({
          "insertOne": {
            "document": track
          }
        });
    });
    await db.Track.bulkWrite(bulkOperations);

    // Announcements
    await Promise.all(
      seed.announcements.map(async announcement =>
        db.Announcement.create(announcement),
      ),
    );

    // Features
    await Promise.all(
      seed.features.map(async feature => db.Feature.create(feature)),
    );

    // Giveaways
    await Promise.all(
      seed.giveaway.map(async giveaway => db.Giveaway.create(giveaway)),
    );

    // Shows
    await Promise.all(seed.show.map(async show => db.Show.create(show)));

    // Traffic
    await Promise.all(
      seed.traffic.map(async traffic => db.Traffic.create(traffic)),
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
