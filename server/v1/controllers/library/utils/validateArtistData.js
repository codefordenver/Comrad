const db = require('../../../models');

async function validateArtistData(data, id) {
  if (typeof data.name !== 'undefined') {
    data.name = data.name.trim();
    if (data.name.length === 0) {
      throw 'Must provide a value for name';
    }
    //ensure this does not have the same name as another entity in the database
    const parameters = {
      $text: {
        $search: '"' + data.name + '"',
      } /* use $text to search rather than a query for name so that the search is case-insensitive */,
      type: 'artist',
    };
    if (typeof id !== 'undefined') {
      parameters._id = { $ne: id };
    }
    return db.Library.find(parameters)
      .then(otherArtists => {
        for (var i = 0; i < otherArtists.length; i++) {
          // check to see if there is an exact match for the name: the $text search will search case-insensitive, but won't search for an exact match
          if (
            otherArtists[i].name.toLowerCase().trim() ===
            data.name.toLowerCase().trim()
          ) {
            throw 'There is already an artist named ' +
              data.name +
              ', please provide a unique name';
          }
        }
        return data;
      })
      .catch(err => {
        console.log('thrown error:');
        console.log(err);
        throw err;
      });
  }
  return data;
}
module.exports = validateArtistData;
