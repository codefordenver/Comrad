/**
 * @swagger
 *
 * /playlists/:playlistId/saved-items/traffic:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsAddTrafficToSavedItems
 *     summary: "Saved Items - Add Traffic"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Adds a traffic event to the scratchpad of the specified playlist.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "masterTimeId": "5f721090ab735642446aa414"
 *           description: JSON with a 'masterTimeId' value containing the masterTimeId of the traffic event to add
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Returns the new item
 *             example:
 *               _id: 5fc97224f5f6b95288c7d241
 *               type: traffic
 *               executed_time_utc: '2020-12-03T23:17:56.374Z'
 *               traffic:
 *                 repeat_rule:
 *                   byweekday:
 *                   - TH
 *                   repeat_start_date: '2020-03-19T15:30:00.000Z'
 *                   frequency: 2
 *                   repeat_end_date: '2022-11-24T16:30:00.000Z'
 *                 traffic_details:
 *                   type: Underwriting
 *                   title: Yellow Scene Magazine
 *                   description: "<p>Please play from Underwriting folder on the Wavecart</p>"
 *                   producer:
 *                   custom:
 *                     old_comrad_event_id: '215'
 *                     old_comrad_scheduled_event_ids:
 *                     - '17451'
 *                   underwriter_name: Yellow Scene Magazine
 *                 status: active
 *                 _id: 5f7211f2ab735642446fefd9
 *                 start_time_utc: '2020-12-03T16:30:00.000Z'
 *                 end_time_utc: '2020-12-03T16:31:00.000Z'
 *                 is_recurring: true
 *                 created_at: '2020-09-28T16:40:18.890Z'
 *                 updated_at: '2020-09-28T16:40:18.890Z'
 *                 __v: 0
 *                 master_event_id: 5f7211f2ab735642446fefd9
 *               master_time_id: 5f7211f2ab735642446fefd9-1607013000000
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
const { populateTrafficInstance } = require('./utils');

async function addTrafficToSavedItems(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' ||
    typeof req.body.masterTimeId === 'undefined'
  ) {
    res.status(422).json('The required parameters were not provided');
  }

  let newTrafficItem = {
    type: 'traffic',
    executed_time_utc: Date.now(),
  };

  let masterTimeId = req.body.masterTimeId;
  let trafficParts = masterTimeId.split('-');
  newTrafficItem.traffic = trafficParts[0];
  newTrafficItem.master_time_id = masterTimeId;

  db.Playlist.findOneAndUpdate(
    {
      _id: req.params.playlistId,
    },
    {
      $push: {
        saved_items: newTrafficItem,
      },
    },
    { new: true },
  )
    .then(dbPlaylist =>
      db.Playlist.populate(dbPlaylist, ['saved_items.traffic']),
    )
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        res.status(422).json('Playlist does not exist');
      }
      let trafficItem =
        dbPlaylist.saved_items[dbPlaylist.saved_items.length - 1];
      trafficItem.traffic = populateTrafficInstance(
        trafficItem.traffic,
        trafficItem.master_time_id,
        dbPlaylist.start_time_utc,
        dbPlaylist.end_time_utc,
      );
      return res.json(trafficItem);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ errorMessage: err });
    });
}

module.exports = addTrafficToSavedItems;
