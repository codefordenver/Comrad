/**
 * @swagger
 *
 * /playlists/:playlistId/saved-items/track:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsAddTrackToSavedItems
 *     summary: "Saved Items: Add Track"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Adds a track to the scratchpad of the specified playlist.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "trackId": "5f721090ab735642446aa414"
 *           description: JSON with a trackId value indicating the track to add
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Returns the new item
 *             example:
 *               _id: 5fc96ad8c276474f1c11db3d
 *               type: track
 *               track:
 *                 popularity: 0
 *                 _id: 5f721090ab735642446aa414
 *                 name: The Up And Down
 *                 album:
 *                   popularity: 0
 *                   _id: 5f720efe66320235249b9b04
 *                   name: Take One
 *                   artist: 5f720eda663202352499f795
 *                   label: Destination Unknown
 *                   genre: 5f720ef466320235249b2d93
 *                   compilation: false
 *                   custom:
 *                     itunes_id:
 *                     old_comrad_id: '1111177433'
 *                     local: '0'
 *                     location: Digital Library
 *                   type: album
 *                   created_at: '2020-09-28T16:27:42.994Z'
 *                   updated_at: '2020-09-28T16:27:42.994Z'
 *                 track_number: 5
 *                 disk_number: 1
 *                 duration_in_seconds: 252
 *                 custom:
 *                   old_comrad_id: '279476'
 *                 type: track
 *                 artists:
 *                 - popularity: 0
 *                   _id: 5f720eda663202352499f795
 *                   name: The Way Low Down
 *                   type: artist
 *                   created_at: '2020-09-28T16:27:06.069Z'
 *                   updated_at: '2020-09-28T16:27:06.069Z'
 *                 created_at: '2020-09-28T16:34:24.830Z'
 *                 updated_at: '2020-09-28T16:34:24.830Z'
 *               executed_time_utc: '2020-12-03T22:46:48.754Z'
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

async function addTrackToSavedItems(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' ||
    typeof req.body.trackId === 'undefined'
  ) {
    res.status(422).json('The required parameters were not provided');
  }

  db.Playlist.findOneAndUpdate(
    {
      _id: req.params.playlistId,
    },
    {
      $push: {
        saved_items: {
          type: 'track',
          track: req.body.trackId,
          executed_time_utc: Date.now(),
        },
      },
    },
    { new: true },
  )
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        res.status(422).json('Playlist does not exist');
      }
      return populatePlaylist(dbPlaylist)
        .then(dbPlaylist => {
          return res.json(
            dbPlaylist.saved_items[dbPlaylist.saved_items.length - 1],
          );
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = addTrackToSavedItems;
