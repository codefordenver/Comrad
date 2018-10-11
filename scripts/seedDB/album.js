require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../../models');
const keys = require('../../config/keys');
const albumSeeds = require('./lib/albums.json');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

db.Album.remove({}).catch(err => console.log(err));
db.Track.remove({}).catch(err => console.log(err));

albumSeeds.forEach(seed => {
  db.Album
    .create(seed.album)
    .then(res => {
      
      seed.tracks.forEach(track => {
        track['album_id'] = res._id;
        db.Track
          .create(track)
          .then()
          .catch(err => console.log(err));
      })
    })
    .catch(err => console.log(err));
});

console.log('Ctrl + C to exit');