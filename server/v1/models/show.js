const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
  status: {
    //active or deleted/canceled
    type: String,
    default: 'active',
  },
  show_details: {
    title: String,
    summary: String,
    description: String,
    producer: String,
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    guests: [String],
    custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties
  },

  show_start_time_utc: Date,
  show_end_time_utc: Date,

  master_show_uid: { type: Schema.Types.ObjectId, ref: 'Show' },
  replace_show_date: Date, //The date of the show to replace in the master repeating series. For the most part, will be the same as show_start_time_utc. But if on the instance you want to reschedule it for some reason, you need one of the fields to be the new date/time while still matching with the original to replace it.

  is_recurring: Boolean,
  repeat_rule: {
    //an rrule - https://www.npmjs.com/package/rrule
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

  exclude_rule: String, //an rrule, for dates to exclude
  exclude_dates: [Date], //individual dates to exclude from the repeating

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
