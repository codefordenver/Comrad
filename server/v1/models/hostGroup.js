const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostGroupSchema = new Schema({
  onAirName: {
    type: String,
    required: true,
  },

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

hostGroupSchema.index({ users: 1 }, { background: true });

const HostGroup = mongoose.model('HostGroup', hostGroupSchema);

module.exports = HostGroup;
