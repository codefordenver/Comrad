const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = require('./base/event');

const showSchema = new Schema({
  ...EventSchema,

  show_details: {
    title: String,
    summary: String,
    description: String,
    producer: String,
    host: {
      type: Schema.Types.ObjectId,
      refPath: function() {
        return 'show_details.host_type';
      },
    },
    host_type: { type: String, required: true, default: 'User' }, // whichever collection the host value refers to, either User or HostGroup
    guests: { type: [String], default: null },
    custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties
  },
});

showSchema.index({ 'show_details.title': 'text' }, { background: true });

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
