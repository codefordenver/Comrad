// goes through each record in the search library and regenerates the search_index field

const db = require('../models');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { updateSearchIndex } = require('../controllers/library/utils');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

async function generateSearchIndexForLibrary() {
  // we will only get the artists, because the updateSearchIndex will iterate through all albums & tracks related to artists,
  // which should cover everything
  var artists = await db.Library.find({ type: 'artist' });
  for (var i = 0; i < artists.length; i++) {
    await updateSearchIndex(artists[i]);
  }
}

generateSearchIndexForLibrary()
  .then(() => {
    console.log('Generated search index for library successfully!');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
