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

  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  },

  local: {
    type: Boolean,
  },

  compilation: {
    type: Boolean,
  },

  popularity: {
    // ranges from 0-100, with 100 being most popular
    type: Number,
    default: 0,
  },

  custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties

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

albumSchema
  .index({ name: 'text' }, { background: true })
  .index({ artist: 1 }, { background: true })
  .index({ updated_at: -1 }, { background: true });

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
