/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Show:
 *       description: A show. Can represent either a repeating series, or a single show instance, which could be within a series, or its own standalone instance. If a show instance is within a series, it will have a `master_event_id` value that references the series Show object.
 *       type: object
 *       required: [show_details.title,status,start_time_utc,end_time_utc,is_recurring]
 *       properties:
 *         show_details:
 *           title:
 *             type: string
 *             description: Title of the show
 *           summary:
 *             type: string
 *             description: A short summary of the show
 *           description:
 *             type: string
 *             description: A longer description of the show
 *           producer:
 *             type: string
 *             description: The producer of the show
 *           host:
 *             oneOf:
 *             - $ref: '#/components/schemas/User'
 *             - $ref: '#/components/schemas/HostGroup'
 *           host_type:
 *             type: string
 *             enum: [User,HostGroup]
 *             description: Whether the `host` field references a `User` or `HostGroup`
 *           guests:
 *             type: array
 *             items:
 *               type: string
 *             description: A list of guests on the show
 *           custom:
 *             type: object
 *             description: An object containing custom properties for the show
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
 *             $ref: '#/components/schemas/Show'
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
 *           repeat_start_date: '2011-03-28T15:30:00.000Z'
 *           frequency: 2
 *           repeat_end_date: '9999-01-01T06:00:00.000Z'
 *         show_details:
 *           host_type: User
 *           title: Morning Sound Alternative
 *           summary: Diverse and eclectic sounds, on the mellow side.
 *           description: "<p>Diverse and eclectic sounds, on the mellow side. You'll hear everything
 *             from Ambient Electronics to Reggae to Folk.</p>"
 *           producer:
 *           host:
 *           custom:
 *             a_custom_property: Custom value
 *         status: active
 *         _id: 5f35a6ef783e63454cd918f1
 *         start_time_utc: '2011-03-28T15:30:00.000Z'
 *         end_time_utc: '2011-03-28T18:06:00.000Z'
 *         is_recurring: true
 *         created_at: '2020-08-13T20:47:43.675Z'
 *         updated_at: '2020-08-13T20:47:43.675Z'
 *         __v: 0
 */

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
    host: {
      type: Schema.Types.ObjectId,
      refPath: function() {
        return 'show_details.host_type';
      },
    },
    host_type: { type: String, required: true, default: 'User' }, // whichever collection the host value refers to, either User or HostGroup
    guests: { type: [String], default: null },
    custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties
  },
});

showSchema.index({ 'show_details.title': 'text' }, { background: true });

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
