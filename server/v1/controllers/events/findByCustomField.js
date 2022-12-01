/**
 * @swagger
 *
 * /events/shows/by-custom-field:
 *   get:
 *     tags:
 *     - Shows
 *     operationId: GetShowByCustomField
 *     summary: Get by Custom Field
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: name
 *       in: query
 *       required: true
 *       type: string
 *       description: The name of the field.
 *     - name: value
 *       in: query
 *       required: true
 *       type: string
 *       description: The exact value to match
 *     - name: listDjs
 *       in: query
 *       required: false
 *       type: boolean
 *       description: If true, will include list of all DJs who have hosted the show
 *     description: |
 *       Get shows based on the exact value of a custom field.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                   $ref: '#/components/schemas/Show'
 *                 example:
 *                   repeat_rule:
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
 *                     - Sample Guest
 *                     title: Morning Sound Alternative
 *                     summary: Diverse and eclectic sounds, on the mellow side.
 *                     description: "<p>Diverse and eclectic sounds, on the mellow side. You'll hear everything
 *                       from Ambient Electronics to Reggae to Folk.</p>"
 *                     producer:
 *                     host:
 *                     custom:
 *                       custom_property: Custom value
 *                   status: active
 *                   _id: 5f7211d1ab735642446f672c
 *                   start_time_utc: '2020-10-19T15:30:00Z'
 *                   end_time_utc: '2020-10-19T18:06:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:39:45.464Z'
 *                   updated_at: '2020-09-28T16:39:45.464Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f7211d1ab735642446f672c
 *                   master_time_id: 5f7211d1ab735642446f672c-1603121400000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 * /events/traffic/by_custom_field:
 *   get:
 *     tags:
 *     - Traffic
 *     operationId: GetTrafficByCustomField
 *     summary: Get by Custom Field
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: name
 *       in: query
 *       required: true
 *       type: string
 *       description: The name of the field.
 *     - name: value
 *       in: query
 *       required: true
 *       type: string
 *       description: The exact value to match
 *     description: |
 *       Get traffic events based on the exact value of a custom field.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 schema:
 *                   $ref: '#/components/schemas/Traffic'
 *                   example:
 *                     traffic_details:
 *                       type: Underwriting
 *                       title: Rocky Mountain Oysters
 *                       description: "<p>a</p>"
 *                       producer:
 *                       custom:
 *                         custom_property: Custom value
 *                       underwriter_name: Rocky Mountain Oysters
 *                     status: active
 *                     _id: 5f7211f4ab735642446ff94a
 *                     start_time_utc: '2013-06-11T01:00:00.000Z'
 *                     end_time_utc: '2013-06-11T01:01:00.000Z'
 *                     created_at: '2020-09-28T16:40:20.397Z'
 *                     updated_at: '2020-09-28T16:40:20.397Z'
 *                     __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const {
  utils: { getModelForEventType },
  utils__mongoose: { populateShowHost,
    populateMasterEvent,
    populateMasterEventShowDetails },
} = require('./utils');
const _ = require('lodash');

function findByCustomField(req, res) {
  const { name, value , listDjs} = req.query;
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }


  if (!name || !value) {
    return res
      .status(422)
      .json({ message: 'name and value must be provided' });
  }

  let filters = {};
  filters['show_details.custom.' + name] = value;
  return dbModel
      .find(filters)
      .populate(populateShowHost())
      .populate(populateMasterEvent())
      .populate(populateMasterEventShowDetails())
      .then(dbEvent => {
        
        //combine the instance data with master series event data
        let results = [];
        dbEvent.forEach(event => {
          if (event.master_event_id && event.master_event_id instanceof Object) {
            
            let masterEvent = JSON.parse(JSON.stringify(event.master_event_id));

            let show = JSON.parse(JSON.stringify(event));

            results.push(_.merge(masterEvent, show));

          } else {
            results.push(event);
          }
        });

        if (listDjs) {
          //retrieve list of DJs who have hosted the show

          //need to finish, but here's the pseudo code
          foreach event
            get host for the current item (master)
            then, find all instances with the master ID matching this item's id
            
            allhosts = 

        } else {
          return res.json(results);
        }
      })
      .catch(err => {
        console.error('error in events > findByCustomField');
        console.error(err);
        return res.status(500).json({ errorMessage: err });
      });
}

module.exports = findByCustomField;
