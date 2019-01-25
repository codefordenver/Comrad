const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String,
  },

  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
  },

  label: {
    type: String,
  },

  local: {
    type: Boolean,
  },

  compilation: {
    type: Boolean,
  },
  
  popularity: { // ranges from 0-100, with 100 being most popular
    type: Number,
    default: 0
  },

  type: {
    type: String,
    default: 'album',
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
