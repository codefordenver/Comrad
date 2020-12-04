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
 *     example: 5fc96318bd1238436c43c74c
 *     description: The id of the item to delete
 *   delete:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsDeleteItemFromScratchpad
 *     summary: "Scratchpad: Delete Item"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Removes the specified item from the scratchpad of the specified playlist, if the item exists.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: No specific return value
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

async function deleteItemFromScratchpad(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' ||
    typeof req.params.itemId === 'undefined'
  ) {
    res.status(422).json('The required parameters were not provided');
  }

  db.Playlist.update(
    {
      _id: req.params.playlistId,
    },
    {
      $pull: {
        scratchpad: {
          _id: req.params.itemId,
        },
      },
    },
  )
    .then(dbPlaylist => {
      res.json([]);
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

module.exports = deleteItemFromScratchpad;
