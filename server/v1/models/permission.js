const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  name: {
    type: String,
  },
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
