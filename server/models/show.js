const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
  status: String,
  show_details: {
    title: String,
    summary: String,
    description: String,
    producer: String,
    host: String,
    guests: [String],
    playlist: String,
    custom: String,
  },

  show_start_time_utc: Date,
  show_end_time_utc: Date,

  master_show_uid: Number,
  replace_show_date: Date,

  is_recurring: Boolean,
  repeat_rule: {
    frequency: Number,
    repeat_start_date: Date,
    repeat_end_date: Date,
    count: Number,
    interval: Number,
    byweekday: [String],
    bymonth: Number,
    bysetpos: Number,
    bymonthday: Number,
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

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
