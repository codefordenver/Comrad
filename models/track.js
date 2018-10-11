const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const trackSchema = new Schema({
  album_id: {
    type: Schema.Types.ObjectId,
    ref: 'Album'
  },

  name: {
    type: String
  },

  track_number: {
    type: String
  },

  disk_number: {
    type: String
  },

  duration: {
    type: String
  },

  artist: {
    type: String
  },

  track: {
    type: String,
    default: 'track'
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

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;