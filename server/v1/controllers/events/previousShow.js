/**
 * @swagger
 *
 * /previous-show:
 *   get:
 *     tags:
 *     - Simple Endpoints
 *     - Shows
 *     operationId: PreviousShow
 *     summary: Previous Show
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns the previous show that was playing. Returns `null` if there are no shows occurring within the previous day.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description: an object containing the previous show, or `null` if no shows occurred within the previous day
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 *             example:
 *               repeat_rule:
 *                 byweekday:
 *                 - MO
 *                 - TU
 *                 - WE
 *                 - TH
 *                 - FR
 *                 repeat_start_date: '2011-03-28T15:30:00.000Z'
 *                 frequency: 2
 *                 repeat_end_date: '9999-01-01T06:00:00.000Z'
 *               show_details:
 *                 host_type: User
 *                 guests:
 *                 -
 *                 title: Morning Sound Alternative
 *                 summary: Diverse and eclectic sounds, on the mellow side.
 *                 description: "<p>Diverse and eclectic sounds, on the mellow side. You'll hear everything
 *                   from Ambient Electronics to Reggae to Folk.</p>"
 *                 producer:
 *                 host:
 *                 custom:
 *                   my_custom_property: Custom value
 *               status: active
 *               _id: 5f35a6ef783e63454cd918f1
 *               start_time_utc: '2020-09-16T15:30:00Z'
 *               end_time_utc: '2020-09-16T18:06:00Z'
 *               is_recurring: true
 *               created_at: '2020-08-13T20:47:43.675Z'
 *               updated_at: '2020-08-13T20:47:43.675Z'
 *               __v: 0
 *               master_event_id:
 *                 _id: 5f35a6ef783e63454cd918f1
 *               master_time_id: 5f35a6ef783e63454cd918f1-1600270200000
 *               playlist_executed:
 *               - _id: 5f7b21b818540a4330aba289
 *                 executed_time_utc: '2020-10-05T13:27:27.465Z'
 *                 type: track
 *                 track:
 *                   popularity: 0
 *                   _id: 5f72104dab73564244687fd7
 *                   name: Low is the Way
 *                   album:
 *                     popularity: 48
 *                     _id: 5f720ef866320235249b55ab
 *                     name: Uncloudy Day
 *                     artist: 5f720ed9663202352499d351
 *                     label: Rhino Records
 *                     genre: 5f720ef466320235249b2da0
 *                     compilation: false
 *                     custom:
 *                       my_custom_property: Custom value
 *                     type: album
 *                     created_at: '2020-09-28T16:27:36.929Z'
 *                     updated_at: '2020-09-28T16:27:36.929Z'
 *                   track_number: 0
 *                   disk_number: 1
 *                   duration_in_seconds: 0
 *                   custom:
 *                     a_custom_property: Custom Value
 *                   type: track
 *                   artists:
 *                   - popularity: 53
 *                     _id: 5f720ed9663202352499d351
 *                     name: The Staple Singers
 *                     type: artist
 *                     created_at: '2020-09-28T16:27:05.636Z'
 *                     updated_at: '2020-09-28T16:27:05.636Z'
 *                   created_at: '2020-09-28T16:33:17.805Z'
 *                   updated_at: '2020-09-28T16:33:17.805Z'
 *               - _id: 5f7b219018540a4330aba284
 *                 type: traffic
 *                 executed_time_utc: '2020-10-05T13:37:20.601Z'
 *                 traffic:
 *                   repeat_rule:
 *                     byweekday: []
 *                     repeat_start_date: '2011-04-03T13:00:00.000Z'
 *                     frequency: 3
 *                     repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                   traffic_details:
 *                     type: Legal ID
 *                     title: Legal Id
 *                     description: '"KGNU, Boulder, Denver and Fort Collins"'
 *                     producer:
 *                     custom:
 *                       a_custom_property: custom value
 *                   status: active
 *                   _id: 5f7211f2ab735642446feea4
 *                   start_time_utc: '2020-10-05T13:00:00Z'
 *                   end_time_utc: '2020-10-05T13:01:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:40:18.628Z'
 *                   updated_at: '2020-09-28T16:40:18.628Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f7211f2ab735642446feea4
 *                   master_time_id: 5f7211f2ab735642446feea4-1601902800000
 *                 master_time_id: 5f7211f2ab735642446feea4-1601902800000
 *               - _id: 5f7b219218540a4330aba286
 *                 type: traffic
 *                 executed_time_utc: '2020-10-05T13:37:22.408Z'
 *                 traffic:
 *                   repeat_rule:
 *                     byweekday:
 *                     - MO
 *                     - FR
 *                     - MO
 *                     - FR
 *                     repeat_start_date: '2020-05-01T13:00:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '2021-04-02T13:00:00.000Z'
 *                   traffic_details:
 *                     type: Underwriting
 *                     title: Comrad Software 2020
 *                     description: |-
 *                       <p>Support comes from</p>
 *                       <p>Comrad Software. </p>
 *                     producer:
 *                     custom:
 *                       custom_property: custom value
 *                     underwriter_name: Save Home Heat 2020
 *                   status: active
 *                   _id: 5f7211feab735642447026c4
 *                   start_time_utc: '2020-10-05T13:00:00Z'
 *                   end_time_utc: '2020-10-05T13:01:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:40:30.823Z'
 *                   updated_at: '2020-09-28T16:40:30.823Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f7211feab735642447026c4
 *                   master_time_id: 5f7211feab735642447026c4-1601902800000
 *                 master_time_id: 5f7211feab735642447026c4-1601902800000
 *               - _id: 5f7b219718540a4330aba288
 *                 type: voice_break
 *                 executed_time_utc: '2020-10-05T13:37:27.465Z'
 *       401:
 *         description: The authentication you provided to access the API is invalid
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

function currentShow(req, res) {
  const dbModel = getModelForEventType('shows');
  if (!dbModel) {
    res.send(404);
    return;
  }

  let endDate = new Date();
  let startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);

  let filter = findEventQueryByDateRange(startDate, endDate);

  const processEventResults = dbShow => {
    let showResults = eventList(dbShow, startDate, endDate);
    if (showResults.length > 0) {
      let show;
      for (let i = showResults.length - 1; i >= 0; i--) {
        if (new Date(showResults[i].end_time_utc) < endDate) {
          show = showResults[i];
          break;
        }
      }
      if (typeof show === 'undefined') {
        return res.json(null);
      }
      return findOrCreatePlaylist(show.start_time_utc, show.end_time_utc)
        .then(p => {
          show.playlist_executed = p.saved_items;
          return res.json(show);
        })
        .catch(err => {
          console.log(
            'error in events > root > nextShow > findOne for playlist',
          );
          console.error(err);
          return res.status(500).json(err);
        });

      return res.json(showResults[0]);
    } else {
      return res.json(null);
    }
  };

  return dbModel
    .find(filter)
    .populate(populateShowHost())
    .populate(populateMasterEvent())
    .populate(populateMasterEventShowDetails())
    .then(processEventResults)
    .catch(err => {
      console.log('error in events > root > previousShow');
      console.error(err);
      return res.status(500).json(err);
    });
}

module.exports = currentShow;
