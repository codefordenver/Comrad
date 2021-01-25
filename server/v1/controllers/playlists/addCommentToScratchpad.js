/**
 * @swagger
 *
 * /playlists/:playlistId/scratchpad/comment:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsAddCommentToScratchpad
 *     summary: "Scratchpad - Add Comment"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Adds a comment to the scratchpad of the specified playlist.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "description": "This is a comment entered into a playlist"
 *           description: JSON with a 'description' value containing the text to add
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Returns the new comment item
 *             example:
 *               _id: 5fc970f847ee2b5130d739c3
 *               type: comment
 *               description: This is a comment entered into a playlist
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

async function addCommentToScratchpad(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' ||
    typeof req.body.description === 'undefined'
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
          type: 'comment',
          description: req.body.description,
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
    .catch(err => res.status(500).json({ errorMessage: err }));
}

module.exports = addCommentToScratchpad;
