const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String
  },

  artist: {
    type: String
  },

  label: {
    type: String
  },

  local: {
    type: Boolean
  },

  compilation: {
    type: String
  },

  location: {
    type: String
  },

  album_art: {
    type: String
  },

  type: {
    type: String,
    defualt: 'album'
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;