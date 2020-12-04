/**
 * @swagger
 *
 * /playlists/:playlistId/scratchpad/track:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsAddTrackToScratchpad
 *     summary: "Scratchpad: Add Track"
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
 *             "trackId": "5fc96318bd1238436c43c74c"
 *           description: JSON with a trackId value indicating the track to add
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Returns the new scratchpad item
 *             example:
 *               _id: 5fc969a23000804d54f7b3de
 *               type: track
 *               track:
 *                 popularity: 0
 *                 _id: 5f72105dab73564244691d04
 *                 name: JACKSON
 *                 album:
 *                   popularity: 0
 *                   _id: 5f720ef966320235249b7172
 *                   name: The Legend of Johnny Cash
 *                   artist: 5f720ed9663202352499be4a
 *                   label: Legacy
 *                   genre: 5f720ef466320235249b2d9a
 *                   compilation: false
 *                   custom:
 *                     itunes_id:
 *                     old_comrad_id: '36377'
 *                     local: '0'
 *                     location: Gnu Bin
 *                     library_number: '36377'
 *                   type: album
 *                   created_at: '2020-09-28T16:27:37.791Z'
 *                   updated_at: '2020-09-28T16:27:37.791Z'
 *                 track_number: 0
 *                 disk_number: 1
 *                 duration_in_seconds: 0
 *                 custom:
 *                   old_comrad_id: '79970'
 *                 type: track
 *                 artists:
 *                 - popularity: 61
 *                   _id: 5f720ed9663202352499be4a
 *                   name: Johnny Cash
 *                   type: artist
 *                   created_at: '2020-09-28T16:27:05.308Z'
 *                   updated_at: '2020-09-28T16:27:05.308Z'
 *                 created_at: '2020-09-28T16:33:33.436Z'
 *                 updated_at: '2020-09-28T16:33:33.436Z'
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

async function addTrackToScratchpad(req, res) {
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
        scratchpad: {
          type: 'track',
          track: req.body.trackId,
        },
      },
    },
    { new: true },
  )
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        return res.status(422).json('Playlist does not exist');
      }
      return populatePlaylist(dbPlaylist)
        .then(dbPlaylist => {
          return res.json(
            dbPlaylist.scratchpad[dbPlaylist.scratchpad.length - 1],
          );
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = addTrackToScratchpad;
