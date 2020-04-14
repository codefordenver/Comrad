const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//base schema for any repeating event, which includes shows and all traffic events

const EventSchema = {
  status: {
    type: String,
    enum: ['active', 'deleted', 'canceled'],
    default: 'active',
  },
  start_time_utc: {
    type: Date,
    index: true,
    required: true,
  },
  end_time_utc: {
    type: Date,
    index: true,
    required: true,
  },

  master_event_id: { type: Schema.Types.ObjectId }, //if this is an instance, this property designates the repeating version of the event
  replace_event_date: Date, //The date of the show to replace in the master repeating series. For the most part, will be the same as start_time_utc. But if on the instance you want to reschedule it for some reason, you need one of the fields to be the new date/time while still matching with the original to replace it.

  is_recurring: Boolean,
  repeat_rule: {
    //an rrule - https://www.npmjs.com/package/rrule
    frequency: Number,
    repeat_start_date: {
      type: Date,
      index: true,
    },
    repeat_end_date: {
      type: Date,
      index: true,
    },
    count: Number,
    interval: Number,
    byweekday: [String],
    bymonth: Number,
    bysetpos: Number,
    bymonthday: Number,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
};

module.exports = EventSchema;
