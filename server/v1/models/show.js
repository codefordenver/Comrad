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
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    guests: { type: [String], default: null },
    custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties
  },
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
