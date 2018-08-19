require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../../models');
const keys = require('../../config/keys');
const tracks = require('./track');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const albumData = {
  itunes_id: '1',
  title: 'Thriller',
  artist: 'Michael Jackson',
  label: 'Epic',
  genre_id: '1',
  local: false,
  compilation: '',
  location: '',
  album_art: '',
  tracks: []
}

db.Album
  .remove({})
  .then(()=> db.Album.create(albumData))
  .then(dbAlbum => {
    console.log(dbAlbum);

    tracks.forEach(track => {
      return track.album_id = dbAlbum._id;
    });

    console.log(tracks);

    db.Track
      .insertMany(tracks, (err, dbTrack) => {
        console.log(dbTrack);
      });

    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1)
  });