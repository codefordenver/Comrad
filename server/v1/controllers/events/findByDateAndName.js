/**
 * @swagger
 *
 * /events/shows/{date}:
 *   parameters:
 *   - name: date
 *     in: path
 *     required: true
 *     example: "2020-12-17"
 *     description: The date on which to pull shows
 *   get:
 *     tags:
 *     - Shows
 *     operationId: FindShowByDateAndName
 *     summary: Find by Date and Name
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: name
 *       in: query
 *       required: false
 *       type: string
 *       description: Return shows matching this string
 *       example: Restless Mornings
 *     description: |
 *       Pull all shows on a particular date, filtered by those matching the optional `name` parameter.  If `name` is provided, only returns the most relevant results.
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
 *                 - _id: 5f7211d1ab735642446f66fa
 *                   repeat_rule:
 *                     byweekday:
 *                     - TU
 *                     - WE
 *                     - TH
 *                     - FR
 *                     repeat_start_date: '2011-03-29T09:00:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   show_details:
 *                     host_type: User
 *                     guests:
 *                     -
 *                     title: Restless Mornings
 *                     summary: The proving ground for new talent
 *                     description: '<p><span style="font-family: Arial,sans-serif;">Anything can happen
 *                       as new DJs get their chops behind the mixing board.<br /></span></p>'
 *                     producer:
 *                     host:
 *                     custom:
 *                       record_audio: '1'
 *                       url: restless
 *                       source: KGNU
 *                   status: active
 *                   start_time_utc: '2020-12-16T10:00:00Z'
 *                   end_time_utc: '2020-12-16T12:30:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:39:45.137Z'
 *                   updated_at: '2020-09-28T16:39:45.137Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f7211d1ab735642446f66fa
 *                   master_time_id: 5f7211d1ab735642446f66fa-1608112800000
 *                   playlist_executed:
 *                   - _id: 5fdb8857dd9f7341283d80dd
 *                     type: track
 *                     track:
 *                       popularity: 0
 *                       _id: 5f72109aab735642446ad5f8
 *                       name: I Think, Therefore I Am
 *                       album:
 *                         popularity: 0
 *                         _id: 5f720efe66320235249b9b04
 *                         name: Take One
 *                         artist: 5f720eda663202352499f795
 *                         label: Destination Unknown
 *                         genre: 5f720ef466320235249b2d93
 *                         compilation: false
 *                         custom:
 *                           itunes_id:
 *                           old_comrad_id: '1111177433'
 *                           local: '0'
 *                           location: Digital Library
 *                         type: album
 *                         created_at: '2020-09-28T16:27:42.994Z'
 *                         updated_at: '2020-09-28T16:27:42.994Z'
 *                       track_number: 2
 *                       disk_number: 1
 *                       duration_in_seconds: 259
 *                       custom:
 *                         old_comrad_id: '292290'
 *                       type: track
 *                       artists:
 *                       - popularity: 0
 *                         _id: 5f720eda663202352499f795
 *                         name: The Way Low Down
 *                         type: artist
 *                         created_at: '2020-09-28T16:27:06.069Z'
 *                         updated_at: '2020-09-28T16:27:06.069Z'
 *                       created_at: '2020-09-28T16:34:34.312Z'
 *                       updated_at: '2020-09-28T16:34:34.312Z'
 *                     executed_time_utc: '2020-12-17T16:33:27.295Z'
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the parameters you provided. See response for more details
 *       500:
 *         description: Server error. Check the response for more details.
 * /events/traffic/{date}:
 *   parameters:
 *   - name: date
 *     in: path
 *     required: true
 *     example: "2020-12-17"
 *     description: The date on which to pull traffic
 *   get:
 *     tags:
 *     - Traffic
 *     operationId: FindTrafficByDateAndName
 *     summary: Find by Date and Name
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: name
 *       in: query
 *       required: false
 *       type: string
 *       description: Return traffic matching this string
 *       example: BBC
 *     description: |
 *       Pull all traffic on a particular date, filtered by those matching the optional `name` parameter. If `name` is provided, only returns the most relevant results.
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
 *                 - _id: 5f7211f2ab735642446feeb1
 *                   repeat_rule:
 *                     byweekday:
 *                     - MO
 *                     - TU
 *                     - WE
 *                     - TH
 *                     - FR
 *                     repeat_start_date: '2011-04-11T14:01:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   traffic_details:
 *                     type: Feature
 *                     title: BBC News Headlines
 *                     description: "<p>Found on Channel 10A.&nbsp; Listen for an out cue, you must cut
 *                       away gracefully after 5 minutes.</p>"
 *                     producer: BBC
 *                     custom:
 *                       old_comrad_event_id: '14'
 *                       old_comrad_scheduled_event_ids:
 *                       - '146'
 *                   status: active
 *                   start_time_utc: '2020-12-16T15:01:00Z'
 *                   end_time_utc: '2020-12-16T15:06:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:40:18.639Z'
 *                   updated_at: '2020-09-28T16:40:18.639Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f7211f2ab735642446feeb1
 *                   master_time_id: 5f7211f2ab735642446feeb1-1608130860000
 *                 - _id: 5f7211f2ab735642446feeaf
 *                   repeat_rule:
 *                     byweekday:
 *                     - MO
 *                     - TU
 *                     - WE
 *                     - TH
 *                     - FR
 *                     repeat_start_date: '2015-07-14T18:01:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   traffic_details:
 *                     type: Feature
 *                     title: BBC News Headlines
 *                     description: "<p>Found on Channel 10A.&nbsp; Listen for an out cue, you must cut
 *                       away gracefully after 5 minutes.</p>"
 *                     producer: BBC
 *                     custom:
 *                       old_comrad_event_id: '14'
 *                       old_comrad_scheduled_event_ids:
 *                       - '4873'
 *                   status: active
 *                   start_time_utc: '2020-12-16T19:01:00Z'
 *                   end_time_utc: '2020-12-16T19:06:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:40:18.634Z'
 *                   updated_at: '2020-09-28T16:40:18.634Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f7211f2ab735642446feeaf
 *                   master_time_id: 5f7211f2ab735642446feeaf-1608145260000
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
  utils: { getModelForEventType, eventList },
  utils__mongoose: {
    findEventQueryByDateRange,
    populateShowHost,
    populateMasterEvent,
    populateMasterEventShowDetails,
  },
} = require('./utils');

const { findOrCreatePlaylist } = require('../playlists/utils');

const moment = require('moment-timezone');
const keys = require('../../config/keys');

// searches the series titles
function findByDateAndName(req, res) {
  let { name } = req.query;
  const { eventType, year, month, day } = req.params;

  const dbModel = getModelForEventType(eventType);
  if (!dbModel) {
    res.send(404);
    return;
  }

  let startOfDay = moment.tz(
    year + '-' + month + '-' + day,
    keys.stationTimeZone,
  );
  let endOfDay = moment(startOfDay).endOf('day');

  let filter = [findEventQueryByDateRange(startOfDay, endOfDay)];

  let aggregationPipeline = [
    {
      $match: {
        $and: filter,
      },
    },
  ];
  if (name != null) {
    filter.push({ $text: { $search: name } });
    aggregationPipeline.push({
      $addFields: {
        score: { $meta: 'textScore' },
      },
    });
    aggregationPipeline.push({
      $sort: { score: -1 },
    });
  }

  dbModel
    .aggregate(aggregationPipeline)
    .then(results => {
      if (name != null) {
        // return only the top-matching results
        if (results.length > 0) {
          let maxScore = results[0].score;
          for (var i = results.length - 1; i >= 0; i--) {
            if (results[i].score >= 1 || results[i].score > maxScore - 0.2) {
              //keep the value
              delete results[i].score;
            } else {
              //remove the value
              delete results[i];
            }
          }
        }
      }

      let showResults = eventList(results, startOfDay, endOfDay);

      if (eventType == 'shows') {
        return Promise.all(
          showResults.map(show => {
            return findOrCreatePlaylist(show.start_time_utc, show.end_time_utc)
              .then(p => {
                show.playlist_executed = p.saved_items;
                return show;
              })
              .catch(err => {
                console.log(
                  'error in events > findByDateAndName for individual playlist',
                );
                console.error(err);
                return res.status(500).json(err);
              });
          }),
        )
          .then(values => {
            return res.json(values);
          })
          .catch(err => {
            console.log('error in events > findByDateAndName for Promise.all');
            console.error(err);
            return res.status(500).json(err);
          });
      } else {
        return res.json(showResults);
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ errorMessage: err });
    });
}

module.exports = findByDateAndName;
