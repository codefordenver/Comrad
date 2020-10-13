const db = require('../../../models');
const populatePlaylist = require('./populatePlaylist');

function findOrCreatePlaylist(startTime, endTime) {
  let documentProps = {
    start_time_utc: startTime,
    end_time_utc: endTime,
  };

  return db.Playlist.findOne(documentProps)
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        return db.Playlist.create(documentProps)
          .then(dbPlaylist => {
            return populatePlaylist(dbPlaylist)
              .then(objPlaylist => objPlaylist)
              .catch(err => {
                console.error('error in findOrCreatePlaylist');
                console.log(err);
                return null;
              });
          })
          .catch(err => {
            console.error('error in findOrCreatePlaylist');
            console.log(err);
            return null;
          });
      } else {
        return populatePlaylist(dbPlaylist)
          .then(objPlaylist => objPlaylist)
          .catch(err => {
            console.error('error in findOrCreatePlaylist');
            console.log(err);
            return null;
          });
      }
    })
    .catch(err => {
      console.error('error in findOrCreatePlaylist');
      console.log(err);
      return null;
    });
}

module.exports = findOrCreatePlaylist;
