/**
 * @swagger
 *
 * /events/traffic/earliest:
 *   get:
 *     tags:
 *     - Traffic
 *     operationId: FindTrafficEarliest
 *     summary: Find Earliest
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: type
 *       in: query
 *       required: true
 *       type: string
 *       description: Filter by this type of traffic
 *     description: |
 *       Returns the earliest occurring traffic event of a specific type.
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
 *                 example:
 *                   repeat_rule:
 *                     byweekday:
 *                     - WE
 *                     repeat_start_date: '2020-01-01T16:00:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '2020-12-31T16:00:00.000Z'
 *                   traffic_details:
 *                     type: Underwriting
 *                     title: Grant Farms
 *                     description: <p>This program is supported by you, the KGNU listener-member, and
 *                       by Grant Family Farms. Grant Family Farms CSA delivers locally grown, organic
 *                       vegetables, fruit, eggs, and farm-raised meats year&lsquo;round to neighborhoods
 *                       in Boulder, Denver, and beyond.</p>
 *                     producer:
 *                     custom:
 *                       custom_value: sample custom value
 *                     underwriter_name: Grant Farms
 *                   status: active
 *                   _id: 5f7211f2ab735642446feeb3
 *                   start_time_utc: '2012-05-02T16:00:00.000Z'
 *                   end_time_utc: '2012-05-02T16:01:00.000Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:40:18.668Z'
 *                   updated_at: '2020-09-28T16:40:18.668Z'
 *                   __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the parameters you provided. See response for more details
 *       500:
 *         description: Server error. Check the response for more details.
 */

const {
  utils: { getModelForEventType },
  utils__mongoose: { populateMasterEvent },
} = require('../utils');

function findEarliest(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  return dbModel
    .find({ 'traffic_details.type': req.query.type }, null, {
      sort: { start_date_utc: 1 },
      limit: 1,
    })
    .populate(populateMasterEvent())
    .then(result => res.json(result[0]))
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = findEarliest;
