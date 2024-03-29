const db = require('../../../models');

async function validateTrackData(data) {
  let filterObj = {
    disk_number: data.disk_number,
    track_number: data.track_number,
    album: data.album,
  };
  if (data.id != null) {
    filterObj._id = { $ne: data.id };
  }
  return db.Library.findOne(filterObj)
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
