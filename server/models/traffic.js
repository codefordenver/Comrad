const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trafficSchema = new Schema({
  traffic_details: {
    title: String,
    summary: String,
    description: String,
    producer: String,
    host: String,
    guests: [String],
    custom: String,
  },

  traffic_start_time_utc: Date,
  traffic_end_time_utc: Date,

  master_traffic_uid: Number,
  replace_traffic_date: Date,

  is_recurring: Boolean,
  repeat_rule: {
    frequency: String,
    repeat_start_date: Date,
    repeat_end_date: Date,
    count: Number,
    byweekly: String,
    bymonth: String,
  },

  exclude_rule: String,
  exclude_dates: [Date],

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Traffic = mongoose.model('Traffic', trafficSchema);

module.exports = Traffic;
