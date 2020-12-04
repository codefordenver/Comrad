/**
 * @swagger
 *
 * /playlists/:playlistId/scratchpad/:itemId/rearrange:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96ff500dce7269c97ef58
 *     description: The id of the item to move
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsScratchpadRearrangeItem
 *     summary: "Scratchpad: Rearrange Item"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Moves the specified Scratchpad item to a new position within the Scratchpad array
 *
 *       If moving the item around other items that have `occurs_after_time_utc` or `occurs_before_time_utc` set, you will want to call the Scratchpad: Update Item endpoint after moving the item to adjust those values as well. The moved item should be updated with the `occurs_before_time_utc` value of the item after it in the sequence (after the move is complete). And, similarly, the moved item shoul dbe updated with the `occurs_after_time_utc` of the item before it in the sequence (after the move is complete).
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "toIndex": "0"
 *           description: JSON with a 'toIndex' value specifying what index to move the item to
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Does not return any values
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

async function rearrangeScratchpadItem(req, res) {
  if (typeof req.body.toIndex === 'undefined') {
    return res.status(422).json('The required parameters were not provided');
  }

  //get the elemnt we'll be moving
  db.Playlist.findOne({ _id: req.params.playlistId })
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        return res.status(422).json('Playlist does not exist');
      }

      let itemToMove = dbPlaylist.scratchpad.filter(
        s => String(s._id) === req.params.itemId,
      )[0];

      if (itemToMove === null) {
        return res.status(422).json('Could not find matching itemId');
      }

      //remove the element at its current position
      db.Playlist.update(
        { _id: req.params.playlistId },
        {
          $pull: { scratchpad: { _id: req.params.itemId } },
        },
      )
        .then(dbPlaylist => {
          db.Playlist.update(
            { _id: req.params.playlistId },
            {
              $push: {
                scratchpad: {
                  $each: [itemToMove],
                  $position: req.body.toIndex,
                },
              },
            },
          )
            .then(dbPlaylist => {
              return res.status(200).json({});
            })
            .catch(err => res.status(500).json({ errorMessage: err }));
        })
        .catch(err => res.status(500).json({ errorMessage: err }));
    })
    .catch(err => res.status(500).json({ errorMessage: err }));
}

module.exports = rearrangeScratchpadItem;
