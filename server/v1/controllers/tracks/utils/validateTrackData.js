const db = require('../../../models');

async function validateTrackData(data) {
  return db.Track.findOne({
    disk_number: data.disk_number,
    track_number: data.track_number,
    album: data.album,
  })
    .then(otherTrack => {
      if (otherTrack !== null) {
        throw 'There is already a track with the same disk number and track number on this album.';
      }
    })
    .catch(err => {
      console.log('throw error');
      console.log(err);
      throw err;
    });
}
module.exports = validateTrackData;
