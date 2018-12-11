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
