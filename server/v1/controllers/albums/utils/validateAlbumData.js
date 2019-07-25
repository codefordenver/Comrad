const db = require('../../../models');

async function validateAlbumData(data, id) {
  let params = {
    name: data.name,
    artist: data.artist,
  };

  if (typeof id !== 'undefined') {
    params._id = { $ne: id };
  }

  return db.Album.findOne(params)
    .then(otherAlbum => {
      if (otherAlbum !== null) {
        throw 'There is already an album with the same name by this artist.';
      }
      return data;
    })
    .catch(err => {
      console.log('throw error');
      console.log(err);
      throw err;
    });
}
module.exports = validateAlbumData;
