const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  master_event_uid:   Number,
  status:             String,
  start_date_utc:     Date,
  end_date_utc:       Date,
  duration:           Number,
  is_recurring:       Boolean,
  RRULE:{
    freq:             String,
    dtstart:          Date,
    until:            Date,
    count:            Number,
    byweekly:         String,
    bymonth:          String
  },
  RDATE:              Date,
  EXRULE:             String,
  EXDATE:             Date,
  event_details: {
    title:            String,
    summary:          String,
    description:      String,
    producer:         String,
    host:             String,
    guest:            [String],
    custom:           String
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

