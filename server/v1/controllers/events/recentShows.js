/**
 * @swagger
 *
 * /recent-shows:
 *   get:
 *     tags:
 *     - Simple Endpoints
 *     - Shows
 *     operationId: RecentShows
 *     summary: Recent Shows
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns an array of the most recent shows, including the current show. The array is sorted by the show time, descending, so the current show is first in the array and the oldest show is last.
 *
 *       Only returns shows from the past week, and will return a maximum of 50 shows.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description: an array containing the current and recent shows
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 *             example:
 *             - repeat_rule:
 *                 byweekday:
 *                 - TU
 *                 repeat_start_date: '2011-04-12T00:30:00.000Z'
 *                 frequency: 2
 *                 repeat_end_date: '9999-01-01T06:00:00.000Z'
 *               show_details:
 *                 host_type: User
 *                 guests:
 *                 -
 *                 title: Outsources
 *                 summary: Gay, Lesbian, Bisexual, Transgender News and Interviews.
 *                 description: "<p>Presenting news and information from the local GLBT community
 *                   and beyond.</p>"
 *                 producer:
 *                 host:
 *                 custom:
 *                   record_audio: '1'
 *                   url: outsources
 *                   source: KGNU
 *               status: active
 *               _id: 5f7211d1ab735642446f6734
 *               start_time_utc: '2020-12-22T01:30:00Z'
 *               end_time_utc: '2020-12-22T02:00:00Z'
 *               is_recurring: true
 *               created_at: '2020-09-28T16:39:45.553Z'
 *               updated_at: '2020-09-28T16:39:45.553Z'
 *               __v: 0
 *               master_event_id:
 *                 _id: 5f7211d1ab735642446f6734
 *               master_time_id: 5f7211d1ab735642446f6734-1608600600000
 *               playlist_executed:
 *               - _id: 5fe150d34e533440f014e7ec
 *                 type: traffic
 *                 executed_time_utc: '2020-12-22T01:50:11.457Z'
 *                 traffic:
 *                   repeat_rule:
 *                     byweekday:
 *                     - TU
 *                     repeat_start_date: '2019-04-02T00:30:00.000Z'
 *                     frequency: 2
 *                     repeat_end_date: '2023-11-28T01:30:00.000Z'
 *                   traffic_details:
 *                     type: Underwriting
 *                     title: Gay And Lesbian Fund For Colorado
 *                     description: "<p>**********A few Versions available to choose from. Please
 *                       play from wav cart- Underwriting file********</p>"
 *                     producer:
 *                     custom:
 *                       old_comrad_event_id: '2172'
 *                       old_comrad_scheduled_event_ids:
 *                       - '13925'
 *                     underwriter_name: Gay And Lesbian Fund For Colorado
 *                   status: active
 *                   _id: 5f7211faab73564244701108
 *                   start_time_utc: '2020-12-22T01:30:00Z'
 *                   end_time_utc: '2020-12-22T01:31:00Z'
 *                   is_recurring: true
 *                   created_at: '2020-09-28T16:40:26.782Z'
 *                   updated_at: '2020-09-28T16:40:26.782Z'
 *                   __v: 0
 *                   master_event_id:
 *                     _id: 5f7211faab73564244701108
 *                   master_time_id: 5f7211faab73564244701108-1608600600000
 *                 master_time_id: 5f7211faab73564244701108-1608600600000
 *               - _id: 5fe150fe4e533440f014e7ee
 *                 type: track
 *                 track:
 *                   popularity: 0
 *                   _id: 5f721073ab7356424469e2d1
 *                   name: Booker's Waltz
 *                   album:
 *                     popularity: 0
 *                     _id: 5f720f0566320235249bba6e
 *                     name: Blue Glass Music
 *                     artist: 5f720eda66320235249a07c4
 *                     label: test
 *                     genre:
 *                     compilation: false
 *                     created_at: '2011-09-27T20:05:38.000Z'
 *                     custom:
 *                       itunes_id:
 *                       old_comrad_id: '1111189315'
 *                       local:
 *                       location: Gnu Bin
 *                     type: album
 *                     updated_at: '2020-09-28T16:27:49.218Z'
 *                   track_number: 4
 *                   disk_number: 1
 *                   duration_in_seconds: 369
 *                   custom:
 *                     old_comrad_id: '229776'
 *                   type: track
 *                   artists:
 *                   - popularity: 0
 *                     _id: 5f720eda66320235249a07c4
 *                     name: Carol Morgan Quartet
 *                     type: artist
 *                     created_at: '2020-09-28T16:27:06.262Z'
 *                     updated_at: '2020-09-28T16:27:06.262Z'
 *                   created_at: '2020-09-28T16:33:55.737Z'
 *                   updated_at: '2020-09-28T16:33:55.737Z'
 *                 executed_time_utc: '2020-12-22T01:50:54.520Z'
 *             - repeat_rule:
 *                 byweekday:
 *                 - TU
 *                 repeat_start_date: '2015-09-08T00:00:00.000Z'
 *                 frequency: 2
 *                 repeat_end_date: '9999-01-01T06:00:00.000Z'
 *               show_details:
 *                 host_type: User
 *                 guests:
 *                 -
 *                 title: Labor Exchange
 *                 summary: Interviews with Local and National Labor Activists and Workers
 *                 description: "<p>Interviews with local and national labor activists and workers
 *                   every other Monday evening at 6pm.</p>"
 *                 producer:
 *                 host:
 *                   on_air_name: Dennis Creese
 *                   _id: 5f7211bfab735642446f66b1
 *                   first_name: Dennis
 *                   last_name: Creese
 *                 custom:
 *                   record_audio: '1'
 *                   url: laborexchange
 *                   source: KGNU
 *               status: active
 *               _id: 5f7211d1ab735642446f6733
 *               start_time_utc: '2020-12-22T01:00:00Z'
 *               end_time_utc: '2020-12-22T01:30:00Z'
 *               is_recurring: true
 *               created_at: '2020-09-28T16:39:45.548Z'
 *               updated_at: '2020-09-28T16:39:45.548Z'
 *               __v: 0
 *               master_event_id:
 *                 _id: 5f7211d1ab735642446f6733
 *               master_time_id: 5f7211d1ab735642446f6733-1608598800000
 *               playlist_executed: []
 *             - repeat_rule:
 *                 byweekday:
 *                 - TU
 *                 repeat_start_date: '2015-09-15T00:00:00.000Z'
 *                 frequency: 2
 *                 repeat_end_date: '9999-01-01T06:00:00.000Z'
 *               show_details:
 *                 host_type: User
 *                 guests:
 *                 -
 *                 title: La Lucha Sigue
 *                 summary: News About Latin America and the Caribbean
 *                 description: '<p><span style="font-family: Arial,sans-serif;">La Lucha Sigue means
 *                   "The Struggle Continues". This half hour news show, played every other Monday
 *                   on KGNU, explores stories and issues from Latin America and the Caribbean that
 *                   are seldom heard on US media.</span></p>'
 *                 producer:
 *                 host:
 *                   on_air_name: Leo Gruip-Ruiz and Marge Taniwaki
 *                   _id: 5f7211bfab735642446f66b0
 *                   first_name: Leo
 *                   last_name: Gruip-Ruiz and Marge Taniwaki
 *                 custom:
 *                   record_audio: '1'
 *                   url: laluchasigue
 *                   source: KGNU
 *               status: active
 *               _id: 5f7211d1ab735642446f6732
 *               start_time_utc: '2020-12-22T01:00:00Z'
 *               end_time_utc: '2020-12-22T01:30:00Z'
 *               is_recurring: true
 *               created_at: '2020-09-28T16:39:45.543Z'
 *               updated_at: '2020-09-28T16:39:45.543Z'
 *               __v: 0
 *               master_event_id:
 *                 _id: 5f7211d1ab735642446f6732
 *               master_time_id: 5f7211d1ab735642446f6732-1608598800000
 *               playlist_executed: []
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

function recentShows(req, res) {
  const dbModel = getModelForEventType('shows');
  if (!dbModel) {
    res.send(404);
    return;
  }

  let endDate = new Date();
  let startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  let filter = findEventQueryByDateRange(startDate, endDate);

  var pageSize = 50;

  const processEventResults = dbShow => {
    let showResults = eventList(dbShow, startDate, endDate);
    if (showResults.length > 0) {
      showResults.reverse();
      if (showResults.length > pageSize) {
        showResults = showResults.slice(0, pageSize);
      }

      return Promise.all(
        showResults.map(show => {
          return findOrCreatePlaylist(show.start_time_utc, show.end_time_utc)
            .then(p => {
              show.playlist_executed = p.saved_items;
              return show;
            })
            .catch(err => {
              console.log(
                'error in events > recentShows for individual playlist',
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
          console.log('error in events > recentShows for Promise.all');
          console.error(err);
          return res.status(500).json(err);
        });
    } else {
      return res.json([]);
    }
  };

  return dbModel
    .find(filter)
    .populate(populateShowHost())
    .populate(populateMasterEvent())
    .populate(populateMasterEventShowDetails())
    .then(processEventResults)
    .catch(err => {
      console.log('error in events > root > recentShows');
      console.error(err);
      return res.status(500).json(err);
    });
}

module.exports = recentShows;
