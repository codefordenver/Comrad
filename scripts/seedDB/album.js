require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../../models');
const keys = require('../../config/keys');

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const albumSeeds = [
  {
    title: 'Escape',
    artist: 'Journey',
    label: 'Columbia',
    local: false,
    compilation: '',
    location: '',
    album_art: ''
  },
  {
    title: 'Thriller',
    artist: 'Michael Jackson',
    label: 'Epic',
    local: false,
    compilation: '',
    location: '',
    album_art: ''
  }
];

db.Album.remove({}).catch(err => res.json(err));

db.Album
  .insertMany(albumSeeds)
  .then(() => {
    console.log('Seed Complete');
    process.exit(0);
  });
