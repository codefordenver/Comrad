const db = require('../../../models');

async function validateEditData(data) {
  return db.Track.findOne({
    disk_number: data.disk_number,
    track_number: data.track_number,
    album: data.album,
    _id: { $ne: data.id },
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

module.exports = validateEditData;
