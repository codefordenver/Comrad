/**
 * @swagger
 *
 * /playlists/:playlistId/scratchpad/voice-break:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsAddVoiceBreakToScratchpad
 *     summary: "Scratchpad - Add Voice Break"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Adds a voice break to the scratchpad of the specified playlist.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Returns the new voice break item
 *             example:
 *               _id: 5fc96ff500dce7269c97ef58
 *               type: voice_break
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

async function addVoiceBreakToScratchpad(req, res) {
  if (typeof req.params.playlistId === 'undefined') {
    res.status(422).json('The required parameters were not provided');
  }

  db.Playlist.findOneAndUpdate(
    {
      _id: req.params.playlistId,
    },
    {
      $push: {
        scratchpad: {
          type: 'voice_break',
        },
      },
    },
    { new: true },
  )
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        res.status(422).json('Playlist does not exist');
      }
      res.json(dbPlaylist.scratchpad[dbPlaylist.scratchpad.length - 1]);
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = addVoiceBreakToScratchpad;
