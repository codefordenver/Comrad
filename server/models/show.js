const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
  title: {
    type: String
  },

  producer: {
    type: String
  },

  summary: {
    type: String
  },

  description: {
    type: String
  },

  host: {
    type: String
  },

  customer_properties: {
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

const Show = mongoose.model('Show', showSchema);

module.exports = Show;