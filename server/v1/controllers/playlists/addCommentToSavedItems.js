/**
 * @swagger
 *
 * /playlists/:playlistId/saved-items/comment:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsAddCommentToSavedItems
 *     summary: "Saved Items: Add Comment"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Adds a comment to the Saved Items of the specified playlist.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "description": "This is a comment entered into Saved Items"
 *           description: JSON with a 'description' value containing the text to add
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Returns the new comment item
 *             example:
 *               _id: 5fc9715ecd36da3cc05fafbf
 *               type: comment
 *               description: This is a comment entered into Saved Items
 *               executed_time_utc: '2020-12-03T23:14:38.020Z'
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

async function addCommentToSavedItems(req, res) {
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
        saved_items: {
          type: 'comment',
          description: req.body.description,
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
      res.json(dbPlaylist.saved_items[dbPlaylist.saved_items.length - 1]);
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

module.exports = addCommentToSavedItems;
