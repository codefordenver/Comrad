const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const featureSchema = new Schema({
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

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;