/**
 * @swagger
 *
 * /events/shows:
 *   post:
 *     tags:
 *     - Shows
 *     operationId: CreateShow
 *     summary: Create
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Create a new Show record.
 *
 *       If `startDate` and `endDate` are provided in the request body, the API endpoint will return the show instances that occur between the start date and end date. Otherwise, no data will be returned.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Show'
 *         required: true
 *         description: "Show object to be added"
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                   $ref: '#/components/schemas/Show'
 *                 example:
 *                 - repeat_rule:
 *                     byweekday:
 *                     - MO
 *                     - TU
 *                     - WE
 *                     - TH
 *                     - FR
 *                     repeat_start_date: '2011-03-28T15:30:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   show_details:
 *                     host_type: User
 *                     guests:
 *                     -
 *                     title: Morning Sound Alternative
 *                     summary: Diverse and eclectic sounds, on the mellow side.
 *                     description: "<p>Diverse and eclectic sounds, on the mellow side. You'll hear everything
 *                       from Ambient Electronics to Reggae to Folk.</p>"
 *                     producer:
 *                     host:
 *                     custom:
 *                       my_custom_property: Custom value
 *                   status: active
 *                   _id: 5f35a6ef783e63454cd918f1
 *                   start_time_utc: '2020-09-16T15:30:00Z'
 *                   end_time_utc: '2020-09-16T18:06:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-08-13T20:47:43.675Z'
 *                   updated_at: '2020-08-13T20:47:43.675Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f35a6ef783e63454cd918f1
 *                   master_time_id: 5f35a6ef783e63454cd918f1-1600270200000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the parameters you provided. See response for more details
 * /events/traffic:
 *   post:
 *     tags:
 *     - Traffic
 *     operationId: CreateTraffic
 *     summary: Create
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Create a new Traffic record.
 *
 *       If `startDate` and `endDate` are provided in the request body, the API endpoint will return the show instances that occur between the start date and end date. Otherwise, no data will be returned.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Underwriting`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Show'
 *         required: true
 *         description: "Traffic object to be added. For traffic events, `end_time_utc` cannot be set: it will always take the value of `start_time_utc`."
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                   $ref: '#/components/schemas/Traffic'
 *                 example:
 *                 - _id: 5f35a719783e63454cd9a071
 *                   repeat_rule:
 *                     byweekday: []
 *                     repeat_start_date: '2011-03-29T16:00:00.000Z'
 *                     frequency: 3
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   traffic_details:
 *                     type: Legal ID
 *                     title: Legal Id
 *                     description: '"KGNU, Boulder, Denver and Fort Collins"'
 *                     producer:
 *                     custom:
 *                       custom_property: A custom value
 *                   status: active
 *                   start_time_utc: '2020-09-16T16:00:00Z'
 *                   end_time_utc: '2020-09-16T16:01:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-08-13T20:48:25.305Z'
 *                   updated_at: '2020-08-13T20:48:25.305Z'
 *                   __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the parameters you provided. See response for more details
 */

const {
  utils: { customRepeatOptionsToRepeatRule, getModelForEventType, eventList },
  utils__mongoose: { determineHostType, populateShowHost },
} = require('./utils');
const moment = require('moment');

function create(req, res) {
  const { body } = req;
  const { startDate, endDate } = body;
  const { eventType } = req.params;
  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  if (eventType === 'traffic') {
    // set the end date/time to the start date/time
    body.end_time_utc = body.start_time_utc;
  }

  //Determine if the repeat dropdown was set, convert to a JSON object.
  if (body.repeat_rule_dropdown_value) {
    let repeat_rule = JSON.parse(body.repeat_rule_dropdown_value);

    if (repeat_rule.name == 'Custom') {
      repeat_rule = {
        ...repeat_rule,
        ...customRepeatOptionsToRepeatRule(body),
      };
    }

    repeat_rule.repeat_start_date = body.repeat_rule.repeat_start_date;

    if (!body.repeat_rule.repeat_end_date) {
      repeat_rule.repeat_end_date = moment('9999', 'YYYY');
    } else {
      repeat_rule.repeat_end_date = moment(body.repeat_rule.repeat_end_date);
    }
    body.repeat_rule = repeat_rule;
  } else {
    body.repeat_rule = {};
  }

  determineHostType(body)
    .then(body => {
      dbModel
        .create(body)
        .then(dbShow => {
          dbModel
            .populate(dbShow, populateShowHost())
            .then(dbShow => {
              if (startDate != null && endDate != null) {
                let events = eventList(dbShow, startDate, endDate);
                return res.status(201).json(events);
              } else {
                return res.status(201).json(null);
              }
            })
            .catch(err => {
              console.log('Error Populating Show Data from linked records');
              res.status(422).json(err);
            });
        })
        .catch(err => {
          console.log('Error Creating Show');
          console.error(err);
          res.status(422).json(err);
        });
    })
    .catch(err => {
      console.log('Error Creating Show, could not determine host type');
      console.error(err);
      res.status(422).json(err);
    });
}

module.exports = create;
