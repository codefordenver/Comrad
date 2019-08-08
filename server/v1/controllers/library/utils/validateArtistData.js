const db = require('../../../models');

async function validateArtistData(data, id) {
  if (typeof data.name !== 'undefined') {
    data.name = data.name.trim();
    if (data.name.length === 0) {
      throw 'Must provide a value for name';
    }
    //ensure this does not have the same name as another entity in the database
    const parameters = { name: data.name };
    if (typeof id !== 'undefined') {
      parameters._id = { $ne: id };
    }
    return db.Library.findOne(parameters)
      .then(otherArtist => {
        if (otherArtist !== null) {
          throw 'There is already an artist named ' +
            data.name +
            ', please provide a unique name';
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
