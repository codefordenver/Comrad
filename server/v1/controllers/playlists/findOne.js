/**
 * @swagger
 *
 * /playlists:
 *   get:
 *     tags:
 *     - Playlists
 *     operationId: FindOnePlaylists
 *     summary: Find One
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: startTime
 *       required: true
 *       in: query
 *       type: string
 *       format: date-time
 *       description: The time the playlist starts at
 *       example: 2020-12-03T16:30:00Z
 *     - name: endTime
 *       required: true
 *       in: query
 *       type: string
 *       format: date-time
 *       description: The time the playlist ends at
 *       example: 2020-12-03T19:06:00Z
 *     description: |
 *       Get a playlist based on its start and end time, if it exists.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 _id: 5fc96303bd1238436c43c74b
 *                 start_time_utc: '2020-12-03T16:30:00.000Z'
 *                 end_time_utc: '2020-12-03T19:06:00.000Z'
 *                 scratchpad:
 *                 - _id: 5fc96318bd1238436c43c74c
 *                   type: track
 *                   track:
 *                     popularity: 0
 *                     _id: 5f72109dab735642446ae259
 *                     name: Mile After Mile
 *                     album:
 *                       popularity: 0
 *                       _id: 5f720f0b66320235249c156d
 *                       name: Easy Livin'
 *                       artist: 5f720eda66320235249a336e
 *                       label: Blind Pig Records
 *                       genre: 5f720ef466320235249b2d97
 *                       compilation: false
 *                       created_at: '2013-06-23T00:01:14.000Z'
 *                       custom:
 *                         itunes_id: '596610087'
 *                         old_comrad_id: '44122'
 *                         local:
 *                         location: Personal
 *                         library_number: '44122'
 *                       type: album
 *                       updated_at: '2020-09-28T16:27:55.577Z'
 *                     track_number: 4
 *                     disk_number: 1
 *                     duration_in_seconds: 136
 *                     custom:
 *                       old_comrad_id: '295468'
 *                     type: track
 *                     artists:
 *                     - popularity: 0
 *                       _id: 5f720eda66320235249a336e
 *                       name: Southern Hospitality
 *                       type: artist
 *                       created_at: '2020-09-28T16:27:06.778Z'
 *                       updated_at: '2020-09-28T16:27:06.778Z'
 *                     created_at: '2020-09-28T16:34:37.153Z'
 *                     updated_at: '2020-09-28T16:34:37.153Z'
 *                 saved_items:
 *                 - _id: 5fc96329bd1238436c43c74e
 *                   type: traffic
 *                   executed_time_utc: '2020-12-03T22:14:01.558Z'
 *                   traffic:
 *                     repeat_rule:
 *                       byweekday:
 *                       - TH
 *                       repeat_start_date: '2020-03-19T15:30:00.000Z'
 *                       frequency: 2
 *                       repeat_end_date: '2022-11-24T16:30:00.000Z'
 *                     traffic_details:
 *                       type: Underwriting
 *                       title: Yellow Scene Magazine
 *                       description: "<p>Please play from Underwriting folder on the Wavecart</p>"
 *                       producer:
 *                       custom:
 *                         old_comrad_event_id: '215'
 *                         old_comrad_scheduled_event_ids:
 *                         - '17451'
 *                       underwriter_name: Yellow Scene Magazine
 *                     status: active
 *                     _id: 5f7211f2ab735642446fefd9
 *                     start_time_utc: '2020-12-03T16:30:00Z'
 *                     end_time_utc: '2020-12-03T16:31:00Z'
 *                     is_recurring: true
 *                     created_at: '2020-09-28T16:40:18.890Z'
 *                     updated_at: '2020-09-28T16:40:18.890Z'
 *                     __v: 0
 *                     master_event_id:
 *                       _id: 5f7211f2ab735642446fefd9
 *                     master_time_id: 5f7211f2ab735642446fefd9-1607013000000
 *                   master_time_id: 5f7211f2ab735642446fefd9-1607013000000
 *                 - _id: 5fc9631abd1238436c43c74d
 *                   type: track
 *                   track:
 *                     popularity: 0
 *                     _id: 5f721071ab7356424469d206
 *                     name: Mile After Mile
 *                     album:
 *                       popularity: 0
 *                       _id: 5f720f0566320235249bb304
 *                       name: Apples Acre
 *                       artist: 5f720eda663202352499feab
 *                       label: Dead Oceans
 *                       genre: 5f720ef466320235249b2d91
 *                       compilation: false
 *                       created_at: '2011-08-11T13:51:14.000Z'
 *                       custom:
 *                         itunes_id:
 *                         old_comrad_id: '42584'
 *                         local: '0'
 *                         location: Library
 *                         library_number: '42584'
 *                       type: album
 *                       updated_at: '2020-09-28T16:27:49.052Z'
 *                     track_number: 2
 *                     disk_number: 1
 *                     duration_in_seconds: 256
 *                     custom:
 *                       old_comrad_id: '225474'
 *                     type: track
 *                     artists:
 *                     - popularity: 0
 *                       _id: 5f720eda663202352499feab
 *                       name: Nurses
 *                       type: artist
 *                       created_at: '2020-09-28T16:27:06.158Z'
 *                       updated_at: '2020-09-28T16:27:06.158Z'
 *                     created_at: '2020-09-28T16:33:53.258Z'
 *                     updated_at: '2020-09-28T16:33:53.258Z'
 *                   executed_time_utc: '2020-12-03T22:13:46.733Z'
 *                 - _id: 5fc9632dbd1238436c43c751
 *                   type: traffic
 *                   executed_time_utc: '2020-12-03T22:14:05.985Z'
 *                   traffic:
 *                     repeat_rule:
 *                       byweekday: []
 *                       repeat_start_date: '2011-03-29T16:00:00.000Z'
 *                       frequency: 3
 *                       repeat_end_date: '9999-01-01T06:00:00.000Z'
 *                     traffic_details:
 *                       type: Legal ID
 *                       title: Legal Id
 *                       description: '"KGNU, Boulder, Denver and Fort Collins"'
 *                       producer:
 *                       custom:
 *                         old_comrad_event_id: '2'
 *                         old_comrad_scheduled_event_ids:
 *                         - '20'
 *                     status: active
 *                     _id: 5f7211f2ab735642446feeac
 *                     start_time_utc: '2020-12-03T17:00:00Z'
 *                     end_time_utc: '2020-12-03T17:01:00Z'
 *                     is_recurring: true
 *                     created_at: '2020-09-28T16:40:18.631Z'
 *                     updated_at: '2020-09-28T16:40:18.631Z'
 *                     __v: 0
 *                     master_event_id:
 *                       _id: 5f7211f2ab735642446feeac
 *                     master_time_id: 5f7211f2ab735642446feeac-1607014800000
 *                   master_time_id: 5f7211f2ab735642446feeac-1607014800000
 *                 created_at: '2020-12-03T22:13:23.386Z'
 *                 updated_at: '2020-12-03T22:13:23.386Z'
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was a problem with the data you submitted. Check the response for more details.
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const { populatePlaylist } = require('./utils');

async function findOne(req, res) {
  if (
    typeof req.query.startTime === 'undefined' ||
    typeof req.query.endTime === 'undefined'
  ) {
    return res
      .status(422)
      .json('You must provide the startTime and endTime parameters');
  }

  const dbPlaylist = await db.Playlist.findOne({
    start_time_utc: req.query.startTime,
    end_time_utc: req.query.endTime,
  });

  if (!dbPlaylist) {
    return res.status(422).json('Playlist does not exist');
  }

  let objPlaylist = await populatePlaylist(dbPlaylist);

  return res.status(200).json(objPlaylist);
}

module.exports = findOne;
