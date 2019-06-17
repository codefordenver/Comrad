const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = require('./base/event');

const trafficSchema = new Schema({
  ...EventSchema,

  traffic_details: {
    type: {
      type: String,
      enum: [
        'Announcement',
        'Feature',
        'Giveaway',
        'Legal ID',
        'PSA',
        'Underwriting',
      ],
      index: true,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: String,
    custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties

    // for feature
    summary: String,
    producer: String,

    // for underwriting
    underwriter_name: String,

    //for giveaway
    giveaway_details: {
      event_name: String,
      event_date: Date,
      venue: String,
      winner: {
        name: String,
        phone: String,
        email: String,
        address: String,
      },
      no_winner: Boolean,
    },
  },
});

const Traffic = mongoose.model('Traffic', trafficSchema);

module.exports = Traffic;
