const mongoose = require('mongoose');
const keys = require('../config/keys');
const seed = require('./data');
const db = require('../models/v1');

async function seedDB() {
  try {
    mongoose.connect(
      keys.mongoURI,
      { useNewUrlParser: true },
    );

    console.log('dropping database...');
    await mongoose.connection.dropDatabase();

    // Users
    console.log('seeding users...');
    await Promise.all(seed.users.map(async user => await db.User.create(user)));

    // Artists
    console.log('seeding artists...');
    let bulkOperations = [];
    seed.artists.forEach(function(artist) {
      bulkOperations.push({
        insertOne: {
          document: artist,
        },
      });
    });
    await db.Artist.bulkWrite(bulkOperations);

    // Albums
    console.log('seeding albums...');
    bulkOperations = [];
    seed.albums.forEach(function(album) {
      bulkOperations.push({
        insertOne: {
          document: album,
        },
      });
    });
    await db.Album.bulkWrite(bulkOperations);

    // Tracks
    console.log('seeding tracks...');
    bulkOperations = [];
    seed.tracks.forEach(function(track) {
      bulkOperations.push({
        insertOne: {
          document: track,
        },
      });
    });
    await db.Track.bulkWrite(bulkOperations);

    // Announcements
    console.log('seeding announcements...');
    await Promise.all(
      seed.announcements.map(async announcement =>
        db.Announcement.create(announcement),
      ),
    );

    // Features
    console.log('seeding features...');
    await Promise.all(
      seed.features.map(async feature => db.Feature.create(feature)),
    );

    // Giveaways
    console.log('seeding giveaways...');
    await Promise.all(
      seed.giveaway.map(async giveaway => db.Giveaway.create(giveaway)),
    );

    // Shows
    console.log('seeding shows...');
    await Promise.all(
      seed.show.map(async show => {
        let user = await db.User.findOne({
          'station.on_air_name': show.show_details.host,
        });
        if (user == null) {
          user = await db.User.create({
            'station.on_air_name': show.show_details.host,
          });
        } else {
          show.show_details.host = user;
        }
        delete show.show_details.host;
        if (show.instaces) {
          delete show.instaces;
        }
        db.Show.create(show);
      }),
    );

    // Traffic
    console.log('seeding traffic...');
    await Promise.all(
      seed.traffic.map(async traffic => db.Traffic.create(traffic)),
    );

    // Venue
    console.log('seeding venues...');
    await Promise.all(seed.venue.map(async venue => db.Venue.create(venue)));
  } catch (err) {
    console.log(err);
    throw err;
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
