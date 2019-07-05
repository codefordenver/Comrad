const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  description: {
    type: String,
  },
  text: {
    type: String,
  },
  value: {
    type: String,
  },
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
