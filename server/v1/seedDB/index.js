const fs = require('fs');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const seed = require('./data');
const db = require('../models');

// This script is set up to store all of its progress in seedScriptProgress.json,
// so that, if the script crashes, it can pick up where it's left off
// An object is stored in the file name below with data on the script's progress

const PROGRESS_FILE_NAME = 'seedScriptProgress.json';

// Notes on running the script:

// The artist, album and track import process is very RAM intensive. If you are getting this error in npm:
//npm ERR! code ELIFECYCLE
//npm ERR! errno 3221225477
//npm ERR! comrad@1.0.0 seed: `node server/v1/seedDB`
//npm ERR! Exit status 3221225477
// It likely indicates you're running out of RAM. Decreasing the sizes of the album & track batches can help with this.
// Though, if you're getting this error a lot, it might be necessary to change the process that creates artists that do not
// already exist in the track creation process so it uses bulk updates.

async function seedDB() {
  try {
    mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

    let scriptProgress;

    if (fs.existsSync(PROGRESS_FILE_NAME)) {
      console.log('found seed status file, picking up where we left off...');
      scriptProgress = JSON.parse(fs.readFileSync(PROGRESS_FILE_NAME));
    } else {
      scriptProgress = {
        droppedDatabase: 0,
        users: 0,
        artists: 0,
        albums: 0,
        tracks: 0,
        showHosts: 0,
        shows: 0,
        traffic: 0,
      };
    }

    if (!scriptProgress.droppedDatabase) {
      console.log('dropping database...');
      await mongoose.connection.dropDatabase();

      scriptProgress.droppedDatabase = 1;
      updateProgressFile(scriptProgress);
    }

    // Users
    if (!scriptProgress.users) {
      console.log('seeding users...');
      await Promise.all(
        seed.users.map(async user => await db.User.create(user)),
      );
      scriptProgress.users = 1;
      updateProgressFile(scriptProgress);
    }

    // Artists
    let allArtists = {};
    if (!scriptProgress.artists) {
      console.log('seeding artists...');
      let bulkOperations = [];
      seed.artists.forEach(function(artist) {
        if (!(artist.toLowerCase() in allArtists)) {
          // we will use the allArtists object to de-duplicate any artist data that is duplicated due to case-sensitivity
          allArtists[artist.toLowerCase()] = 0;
          bulkOperations.push({
            insertOne: {
              document: {
                name: artist,
              },
            },
          });
        } else {
          console.log(
            'Skipping ' +
              artist +
              ', found a duplicate using case-insensitive matching',
          );
        }
      });
      await db.Artist.bulkWrite(bulkOperations);
      scriptProgress.artists = 1;
      updateProgressFile(scriptProgress);
    }

    //remember the indexes of artists for later use
    if (
      scriptProgress.albums < seed.albums.length ||
      scriptProgress.tracks < seed.tracks.length
    ) {
      console.log('getting created artist ids...');
      let allArtistsQuery = await db.Artist.find({}, '_id name', {
        sort: 'name',
      });
      allArtistsQuery.forEach(function(a) {
        allArtists[a.name.toLowerCase()] = a._id;
      });
    }

    // Albums
    console.log('getting existing genres...');
    let existingGenres = await db.Genre.find();
    existingGenres.forEach(function(genre) {
      allGenres[genre.name] = genre._id;
    });

    if (scriptProgress.albums < seed.albums.length) {
      console.log('seeding albums...');
      if (scriptProgress.albums > 0) {
        //pick up where we left off going through the albums array
        seed.albums.splice(0, scriptProgress.albums);
      }
      // process the albums in groups so that we're giving regular feedback on the status
      let batchSize = 10000;
      while (seed.albums.length > 0) {
        let bulkOperations = [];
        let albumsToCreate = seed.albums.splice(0, batchSize);
        for (let index = 0; index < albumsToCreate.length; index++) {
          let album = albumsToCreate[index];
          if (album.artist != null) {
            album.artist = allArtists[album.artist.toLowerCase()];
          }
          if (album.genre != null) {
            album.genre = await getIdForGenre(album.genre);
          }

          //cleanse data that was entered incorrectly in KGNU
          if (album.created_at === '0000-00-00 00:00:00') {
            delete album.created_at;
          }
          if (album.compilation > 1) {
            album.compilation = 1;
          }

          bulkOperations.push({
            insertOne: {
              document: album,
            },
          });
        }
        console.log('bulk writing ' + bulkOperations.length + ' albums...');
        await db.Album.bulkWrite(bulkOperations);
        scriptProgress.albums += albumsToCreate.length;
        updateProgressFile(scriptProgress);
      }
    }

    //remember the old comrad id's of albums for later use
    let allAlbums = {};
    let allAlbumArtists = {};
    if (scriptProgress.tracks < seed.tracks.length) {
      console.log('getting created album ids...');
      let allAlbumsQuery = await db.Album.find(
        {},
        '_id artist custom.old_comrad_id',
      );
      allAlbumsQuery.forEach(function(a) {
        allAlbums[a.custom.old_comrad_id] = a._id;
        allAlbumArtists[a.custom.old_comrad_id] = a.artist;
      });
    }

    // Tracks
    if (scriptProgress.tracks < seed.tracks.length) {
      console.log('seeding tracks...');
      if (scriptProgress.tracks > 0) {
        //pick up where we left off going through the albums array
        seed.tracks.splice(0, scriptProgress.tracks);
      }
      // process the albums in groups so that we're giving regular feedback on the status
      while (seed.tracks.length > 0) {
        let bulkOperations = [];
        let tracksToCreate = seed.tracks.splice(0, 5000);
        for (let index = 0; index < tracksToCreate.length; index++) {
          let track = tracksToCreate[index];
          if (track.artist === null || track.artist.length === 0) {
            // use the artist from the album
            track.artists = [allAlbumArtists[track.album]];
          } else {
            if (!(track.artist.toLowerCase() in allArtists)) {
              console.log('Creating missing artist: ' + track.artist);
              let newArtist = await db.Artist.create({ name: track.artist });
              allArtists[track.artist.toLowerCase()] = newArtist._id;
            }
            track.artists = [allArtists[track.artist.toLowerCase()]];
          }
          delete track.artist;
          if (track.album.length > 0) {
            track.album = allAlbums[track.album];
          } else {
            console.warning('Album empty for track: ' + track.name);
            continue;
          }

          bulkOperations.push({
            insertOne: {
              document: track,
            },
          });
        }
        console.log('writing ' + bulkOperations.length + ' tracks...');
        await db.Track.bulkWrite(bulkOperations);
        scriptProgress.tracks += tracksToCreate.length;
        updateProgressFile(scriptProgress);
      }
    }

    //free up memory used in the music library import process
    allArtists = {};
    allAlbums = {};
    allAlbumArtists = {};

    // Shows
    if (!scriptProgress.showHosts) {
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
      scriptProgress.showHosts = 1;
      updateProgressFile(scriptProgress);
    }

    if (!scriptProgress.shows) {
      console.log('seeding shows...');
      let bulkOperations = [];
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
              show.repeat_rule.repeat_end_date = new Date(
                '9999-01-01T00:00:00',
              );
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
      scriptProgress.shows = 1;
      updateProgressFile(scriptProgress);
    }

    // Traffic
    if (!scriptProgress.traffic) {
      console.log('seeding traffic...');
      let bulkOperations = [];
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
      scriptProgress.traffic = 1;
      updateProgressFile(scriptProgress);
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
    on_air_name: onAirName,
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

let allGenres = {};

async function getIdForGenre(genre) {
  if (genre in allGenres) {
    return allGenres[genre];
  } else {
    let newGenre = await db.Genre.create({
      name: genre,
    });
    allGenres[genre] = newGenre._id;
    return newGenre._id;
  }
}

function updateProgressFile(scriptProgress) {
  fs.writeFileSync(PROGRESS_FILE_NAME, JSON.stringify(scriptProgress));
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
