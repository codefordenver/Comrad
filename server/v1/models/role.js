const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const permissions = require('../config/permissions');

const roleSchema = new Schema({
  description: {
    type: String,
  },

  text: {
    type: String,
  },

  value: {
    type: String,
  },

  permissions: {
    type: Array,
    default: permissions,
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
