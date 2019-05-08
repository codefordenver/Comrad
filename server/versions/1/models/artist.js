const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
  },

  popularity: {
    // ranges from 0-100, with 100 being most popular
    type: Number,
    default: 0,
  },

  type: {
    type: String,
    default: 'artist',
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

artistSchema
  .index({ name: 'text' }, { background: true })
  .index({ updated_at: -1 }, { background: true });

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
