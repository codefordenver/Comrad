const db = require('../../../models');

async function validateAlbumData(data, id) {
  let params = {
    $text: {
      $search: '"' + data.name + '"',
    } /* use $text to search rather than a query for name so that the search is case-insensitive */,
    artist: data.artist,
  };

  if (typeof id !== 'undefined') {
    params._id = { $ne: id };
  }

  return db.Library.find(params)
    .then(otherAlbums => {
      for (var i = 0; i < otherAlbums.length; i++) {
        // check to see if there is an exact match for the name: the $text search will search case-insensitive, but won't search for an exact match
        if (
          otherAlbums[i].name.toLowerCase().trim() ===
          data.name.toLowerCase().trim()
        ) {
          throw 'There is already an album with the same name by this artist.';
        }
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
