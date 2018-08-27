const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const giveawaySchema = new Schema({
  title: {
    type: String
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

const Giveaway = mongoose.model('Giveaway', giveawaySchema);

module.exports = Giveaway;