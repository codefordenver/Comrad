/**
 * @swagger
 *
 * /events/shows/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211d1ab735642446f66f8
 *     description: The id of the show, or an id of the show with a master time id included (like 5f7211d1ab735642446f672c-1603121400000)
 *   get:
 *     tags:
 *     - Shows
 *     operationId: GetByIdShows
 *     summary: Get by ID
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Get a show by ID, or by a show id with a master time id
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 repeat_rule:
 *                   byweekday:
 *                   - MO
 *                   - TU
 *                   - WE
 *                   - TH
 *                   - FR
 *                   repeat_start_date: '2011-03-28T15:30:00.000Z'
 *                   frequency: 2
 *                   repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                 show_details:
 *                   host_type: User
 *                   guests:
 *                   - Sample Guest
 *                   title: Morning Sound Alternative
 *                   summary: Diverse and eclectic sounds, on the mellow side.
 *                   description: "<p>Diverse and eclectic sounds, on the mellow side. You'll hear everything
 *                     from Ambient Electronics to Reggae to Folk.</p>"
 *                   producer:
 *                   host:
 *                   custom:
 *                     custom_property: Custom value
 *                 status: active
 *                 _id: 5f7211d1ab735642446f672c
 *                 start_time_utc: '2020-10-19T15:30:00Z'
 *                 end_time_utc: '2020-10-19T18:06:00Z'
 *                 is_recurring: true
 *                 created_at: '2020-09-28T16:39:45.464Z'
 *                 updated_at: '2020-09-28T16:39:45.464Z'
 *                 __v: 0
 *                 master_event_id:
 *                   _id: 5f7211d1ab735642446f672c
 *                 master_time_id: 5f7211d1ab735642446f672c-1603121400000
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 * /events/traffic/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f7211f4ab735642446ff94a
 *     description: The id of the traffic, or an id of the traffic with a master time id included (like 5f7211d1ab735642446f672c-1603121400000)
 *   get:
 *     tags:
 *     - Traffic
 *     operationId: GetByIdTraffic
 *     summary: Get by ID
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Get a traffic event by ID, or by a traffic id with a master time id
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 traffic_details:
 *                   type: Underwriting
 *                   title: Rocky Mountain Oysters
 *                   description: "<p>a</p>"
 *                   producer:
 *                   custom:
 *                     custom_property: Custom value
 *                   underwriter_name: Rocky Mountain Oysters
 *                 status: active
 *                 _id: 5f7211f4ab735642446ff94a
 *                 start_time_utc: '2013-06-11T01:00:00.000Z'
 *                 end_time_utc: '2013-06-11T01:01:00.000Z'
 *                 created_at: '2020-09-28T16:40:20.397Z'
 *                 updated_at: '2020-09-28T16:40:20.397Z'
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: { populateMasterEvent },
} = require('./utils');

function findById(req, res) {
  const { eventType } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  if (req.params.id.indexOf('-') !== -1) {
    //we are looking for a master time id
    let idParts = req.params.id.split('-');
    return dbModel
      .find({ $or: [{ _id: idParts[0] }, { master_event_id: idParts[0] }] })
      .populate(populateMasterEvent())
      .then(dbEvent => {
        let timestamp = Number(idParts[1]);

        /* must do one hour each direction because rrule does not handle Daylight Savings properly for its .between implementation */
        let showResults = eventList(
          dbEvent,
          timestamp - 1 - 60 * 60 * 1000,
          timestamp + 60 * 60 * 1000 + 1,
        );
        /* example of what's causing the problem that requires an hour each way:
          1. have an event with this rrule:
            { byweekday: [ 'WE' ],
            repeat_start_date: 2019-01-09T15:00:00.000Z,
            frequency: 2,
            repeat_end_date: 2019-12-25T15:00:00.000Z }
          2. Change your computer time to 11/7/19, Mountain Standard Time
          3. Try to get an event that repeats on 10/30/2019 (timestamp of 1572444000000)
          4. rrule.between won't return a date unless you use 15:00 UTC instead (that timestamp is 14:00 UTC, which is when the event should be because of daylight savings adjustment
        */
        /* be sure we are returning the result with the matching master_time_id */
        console.log('here91');
        console.log(showResults);
        console.log(timestamp - 1 - 60 * 60 * 1000);
        console.log(timestamp + 60 * 60 * 1000 + 1);
        let result = showResults[0];
        showResults.forEach(function(event) {
          if (event.master_time_id === req.params.id) {
            result = event;
          }
        });
        return res.json(result);
      })
      .catch(err => {
        console.error(err);
        return res.status(500).json({ errorMessage: err });
      });
  } else {
    //we are just looking for a plain id
    return dbModel
      .findById(req.params.id)
      .then(dbShow => res.json(dbShow))
      .catch(err => res.status(500).json({ errorMessage: err }));
  }
}

module.exports = findById;
