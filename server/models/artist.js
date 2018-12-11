const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
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

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
