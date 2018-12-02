const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  status:               String,
  event_details: {
    title:              String,
    summary:            String,
    description:        String,
    producer:           String,
    host:               String,
    guests:             [String],
    custom:             String
  },

  event_start_time_utc: Date,
  event_end_time_utc:   Date,
  duration_in_minutes:  Number,

  master_event_uid:     Number,
  replace_event_date:   Date,

  is_recurring:         Boolean,
  repeat_rule:{
    frequency:          String,
    repeat_start_date:  Date,
    repeat_end_date:    Date,
    count:              Number,
    byweekly:           String,
    bymonth:            String
  },
  
  exclude_rule:         String,
  exclude_dates:        [Date],
  
  created_at: {
    type:               Date,
    default:            Date.now
  },

  updated_at: {
    type:               Date,
    default:            Date.now
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

