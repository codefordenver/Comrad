const db = require('../../../models');

async function validateTrackData(data, album) {
  console.log(data.disk_number, data.track_number);
  db.Track.findOne({
    disk_number: data.disk_number,
    track_number: data.track_number,
    album: album,
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
