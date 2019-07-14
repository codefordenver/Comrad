const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessControlSchema = new Schema({
  role: {
    type: String,
  },

  resource: {
    type: String,
  },

  action: {
    type: String,
  },

  attributes: {
    type: String,
  },
});

const AccessControl = mongoose.model('AccessControl', accessControlSchema);

module.exports = AccessControl;
