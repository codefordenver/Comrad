/**
 * @swagger
 *
 * /playlists/:playlistId/scratchpad/:itemId:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   - name: itemId
 *     in: path
 *     required: true
 *     example: 5fc969a23000804d54f7b3de
 *     description: The id of the item to update
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsUpdateScratchpadItem
 *     summary: "Scratchpad: Update Item"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Updates the `occurs_after_time_utc` and/or `occurs_before_time_utc` properties of a scratchpad item. Scratchpad items appear in an ordered array within the playlist, and will display in that order. But, traffic events that occur in the playlist's timespan will also show in a track's playlist (unless that traffic event is already "executed" - meaning it is in the playlist's Saved Items list). The `occurs_after_time_utc` and `occurs_before_time_utc` inform Comrad's front-end how to display the scratchpad items relative to the unexecuted traffic items.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "occurs_before_time_utc": "2020-12-03T18:00:00Z"
 *           description: JSON with a trackId value indicating the track to add
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Does not return any data
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

async function updateScratchpadItem(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' &&
    typeof req.params.itemId === 'undefined'
  ) {
    return res.status(422).json('The required parameters were not provided');
  }

  let updateObj = {};

  Object.keys(req.body).forEach(k => {
    updateObj['scratchpad.$.' + k] = req.body[k];
  });

  db.Playlist.updateOne(
    { _id: req.params.playlistId, 'scratchpad._id': req.params.itemId },
    { $set: updateObj },
  )
    .then(dbPlaylist => {
      return res.status(200).json({});
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = updateScratchpadItem;
