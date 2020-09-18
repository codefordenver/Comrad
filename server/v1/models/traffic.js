/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Traffic:
 *       type: object
 *       required: [traffic_details.title,traffic_details.title,status,start_time_utc,end_time_utc,is_recurring]
 *       properties:
 *         traffic_details:
 *           type:
 *             type: string
 *             enum: [Announcement,Feature,Giveaway,Legal ID,PSA,Underwriting]
 *             description: The type of traffic event
 *           title:
 *             type: string
 *             description: Title of the traffic event
 *           description:
 *             type: string
 *             description: A description of the traffic event. DJ-facing, not public-facing.
 *           producer:
 *             type: string
 *             description: For type `Feature`. The producer of the feature
 *           underwriter_name:
 *             type: string
 *             description: For type `Underwriting`. The name of the underwriter
 *           giveaway_details:
 *             event_name:
 *               type: string
 *               description: For type `Giveaway`. The name of the event the giveaway is for
 *             event_date:
 *               type: string
 *               format: date
 *               description: For type `Giveaway`. The date of the event the giveaway is for
 *             event_time:
 *               type: string
 *               description: For type `Giveaway`. The time of the event the giveaway is for
 *             venue:
 *               type: string
 *               description: For type `Giveaway`. The venue of the event the giveaway is for
 *             custom:
 *               type: object
 *               description: For type `Giveaway`. An object containing custom properties for the giveaway.
 *           custom:
 *             type: object
 *             description: An object containing custom properties for the traffic event
 *         status:
 *           type: string
 *           enum: [active,deleted,canceled]
 *           description:
 *         start_time_utc:
 *           type: string
 *           format: date-time
 *           description: The start time of the event
 *         end_time_utc:
 *           type: string
 *           format: date-time
 *           description: The end time of the event
 *         master_event_id:
 *           type:
 *             $ref: '#/components/schemas/Traffic'
 *           description: If this is an instance within a repeating series, this field links to its event series
 *         is_recurring:
 *           type: boolean
 *           description: Whether the event is a repeating series of events
 *         repeat_rule:
 *           $ref: '#/components/schemas/RepeatRule'
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Read only. The time the event was created at.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Read only. The time the event was updated at.
 *       example:
 *         repeat_rule:
 *           byweekday:
 *           - MO
 *           - TU
 *           - WE
 *           - TH
 *           - FR
 *           repeat_start_date: '2020-04-06T16:40:00.000Z'
 *           frequency: 2
 *           repeat_end_date: '9999-01-01T06:00:00.000Z'
 *         traffic_details:
 *           type: Announcement
 *           title: Virtual Events Calendar
 *           description: |-
 *             <p>Please play from the "Programs" folder.</p>
 *           producer:
 *           custom:
 *             old_comrad_event_id: '3302'
 *             old_comrad_scheduled_event_ids:
 *             - '17572'
 *         status: active
 *         _id: 5f35a728783e63454cd9d791
 *         start_time_utc: '2020-09-16T16:40:00Z'
 *         end_time_utc: '2020-09-16T16:41:00Z'
 *         is_recurring: true
 *         created_at: '2020-08-13T20:48:40.673Z'
 *         updated_at: '2020-08-13T20:48:40.673Z'
 *         __v: 0
 *         master_event_id:
 *           _id: 5f35a728783e63454cd9d791
 *         master_time_id: 5f35a728783e63454cd9d791-1600274400000
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = require('./base/event');

const trafficSchema = new Schema(
  {
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
      },

      title: {
        type: String,
      },
      description: String,
      custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties

      // for feature
      producer: String,

      // for underwriting
      underwriter_name: String,

      //for giveaway
      giveaway_details: {
        event_name: String,
        event_date: Date,
        event_time: String,
        venue: String,
        custom: Schema.Types.Mixed,
      },
    },
  },
  { collection: 'traffic' },
);

trafficSchema.index(
  {
    'traffic_details.title': 'text',
    'traffic_details.underwriter_name': 'text',
  },
  { background: true },
);
trafficSchema.index(
  { 'repeat_rule.repeat_start_date': 1 },
  { background: true },
);
trafficSchema.index({ 'repeat_rule.repeat_end_date': 1 }, { background: true });
trafficSchema.index({ start_time_utc: 1 }, { background: true });
trafficSchema.index({ end_time_utc: 1 }, { background: true });

const Traffic = mongoose.model('Traffic', trafficSchema);

module.exports = Traffic;
