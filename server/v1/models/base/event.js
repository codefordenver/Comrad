/**
 * @swagger
 *
 * components:
 *   schemas:
 *     RepeatRule:
 *       type: object
 *       required: [frequency,repeat_start_date,repeat_end_date]
 *       properties:
 *         frequency:
 *           type: integer
 *           enum: [0,1,2,3,4,5,6,7]
 *           description: |
 *             A value specifying the interval at which events should repeat.
 *
 *             Values:
 *             0 = Repeat yearly
 *             1 = Repeat monthly
 *             2 = Repeat weekly
 *             3 = Repeat daily
 *             4 = Repeat hourly
 *             5 = Repeat minutely
 *             6 = Repeat secondly
 *         repeat_start_date:
 *           type: string
 *           format: date-time
 *           description: The date/time to start repeating
 *         repeat_end_date:
 *           type: string
 *           format: date-time
 *           description: The date/time to end repeating
 *         count:
 *           type: integer
 *           description: The maximum number of occurrences to be generated
 *         interval:
 *           type: integer
 *           description: The interval to repeat at. For example, if this is 2 and `frequency` is 3, the event will repeat every two days
 *         byweekday:
 *           type: array
 *           items:
 *             type: string
 *             enum: [MO,TU,WE,TH,FR,SA,SU]
 *           description: Events will only repeat on these weekdays
 *         bymonth:
 *           type: integer
 *           description: Events will only repeat in this month. A number from 1-12.
 *         bysetpos:
 *           type: integer
 *           description: Events will only repeat on the `bysetpos` value in the frequency period. Negative values repesent distance from the end of the frequency period. For example, if we have an event with `frequency` of 1 (monthly), `byweekday` of `['MO']` (Monday) and `bysetpos` of -1, the event will repeat on the last Monday of each month.
 *         bymonthday:
 *           type: integer
 *           description: Events will only repeat on this day of the month. A number from 1-31.
 *       example:
 *         byweekday:
 *         - MO
 *         - TU
 *         - WE
 *         - TH
 *         - FR
 *         repeat_start_date: '2011-03-28T15:30:00.000Z'
 *         frequency: 2
 *         repeat_end_date: '9999-01-01T06:00:00.000Z'
 */

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
