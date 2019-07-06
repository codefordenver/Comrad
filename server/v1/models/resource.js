const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  category: {
    type: String,
  },

  description: {
    type: String,
  },

  link: {
    type: String,
  },
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
