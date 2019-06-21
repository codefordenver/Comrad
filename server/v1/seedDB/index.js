const mongoose = require('mongoose');
const keys = require('../config/keys');
const seed = require('./data');
const db = require('../models');

async function seedDB() {
  try {
    mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

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

    // Shows
    console.log('seeding hosts for shows...');
    let hostsToAdd = [];
    seed.show.forEach(show => {
      if (
        show.show_details.host != null &&
        hostsToAdd.indexOf(show.show_details.host) === -1
      ) {
        hostsToAdd.push(show.show_details.host);
      }
      if (show.instances.length > 0) {
        show.instances.forEach(instance => {
          if (
            instance.show_details != null &&
            instance.show_details.host != null &&
            hostsToAdd.indexOf(instance.show_details.host) === -1
          ) {
            hostsToAdd.push(instance.show_details.host);
          }
        });
      }
    });
    for (let i = 0; i < hostsToAdd.length; i++) {
      await userByOnAirName(hostsToAdd[i]);
    }

    console.log('seeding shows...');
    bulkOperations = [];
    await Promise.all(
      seed.show.map(async show => {
        if (show.show_details.host != null) {
          show.show_details.host = await userByOnAirName(
            show.show_details.host,
          );
        }
        let showInstances = [];
        if (show.instances) {
          showInstances = show.instances;
          delete show.instances;
        }

        //If the end date does not exist, just put an infinite end date
        if (show.repeat_rule) {
          if (!show.repeat_rule.repeat_end_date) {
            show.repeat_rule.repeat_end_date = new Date('9999-01-01T00:00:00');
          }
        }

        const newShow = await db.Show.create(show);
        if (showInstances.length > 0) {
          await Promise.all(
            showInstances.map(async instance => {
              instance.master_event_id = newShow;
              if (
                instance.show_details != null &&
                instance.show_details.host != null
              ) {
                instance.show_details.host = await userByOnAirName(
                  instance.show_details.host,
                );
              }

              //This assume that all instances are a single day so the start and end date are the same
              if (instance.repeat_rule) {
                if (!instance.repeat_rule.repeat_end_date) {
                  instance.repeat_rule.repeat_end_date =
                    instance.repeat_rule.repeat_start_date;
                }
              }

              bulkOperations.push({
                insertOne: {
                  document: instance,
                },
              });
            }),
          );
        }
      }),
    );
    console.log('seeding ' + bulkOperations.length + ' show instances...');
    if (bulkOperations.length > 0) {
      await db.Show.bulkWrite(bulkOperations);
    }

    // Traffic
    console.log('seeding traffic...');
    bulkOperations = [];
    await Promise.all(
      seed.traffic.map(async traffic => {
        let trafficInstances = [];
        if (traffic.instances) {
          trafficInstances = traffic.instances;
          delete traffic.instances;
        }

        //If the end date does not exist, just put an infinite end date
        if (traffic.repeat_rule) {
          if (!traffic.repeat_rule.repeat_end_date) {
            traffic.repeat_rule.repeat_end_date = new Date(
              '9999-01-01T00:00:00',
            );
          }
        }

        const newTraffic = await db.Traffic.create(traffic);
        if (trafficInstances.length > 0) {
          await Promise.all(
            trafficInstances.map(async instance => {
              instance.master_event_id = newTraffic;

              //This assume that all instances are a single day so the start and end date are the same
              if (instance.repeat_rule) {
                if (!instance.repeat_rule.repeat_end_date) {
                  instance.repeat_rule.repeat_end_date =
                    instance.repeat_rule.repeat_start_date;
                }
              }

              bulkOperations.push({
                insertOne: {
                  document: instance,
                },
              });
            }),
          );
        }
      }),
    );
    console.log('seeding ' + bulkOperations.length + ' traffic instances...');
    if (bulkOperations.length > 0) {
      await db.Traffic.bulkWrite(bulkOperations);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

let usersByOnAirName = {};
async function userByOnAirName(onAirName) {
  if (typeof usersByOnAirName[onAirName] != 'undefined') {
    return usersByOnAirName[onAirName];
  }
  let user = await db.User.findOne({
    'station.on_air_name': onAirName,
  });
  if (user == null) {
    //make a first name, last name, and email from the onAirName
    const onAirNameParts = onAirName.split(' ');
    const firstName = onAirNameParts[0];
    let lastName = '(none)';
    if (onAirNameParts.length > 1) {
      lastName = '';
      onAirNameParts.forEach(function(part, idx) {
        if (idx > 0) {
          lastName += ' ' + part;
        }
      });
      lastName = lastName.trim();
    }
    const emailAddress =
      onAirName.replace(/[^a-zA-Z0-9]/gi, '') + '@fake-dj-email.kgnu.org';
    user = await db.User.create({
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      on_air_name: onAirName,
      password: 'temppassword',
    });
  }
  usersByOnAirName[onAirName] = user;
  return user;
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
