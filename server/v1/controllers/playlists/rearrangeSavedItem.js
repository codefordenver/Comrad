/**
 * @swagger
 *
 * /playlists/:playlistId/saved-items/:itemId/rearrange:
 *   parameters:
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc96303bd1238436c43c74b
 *     description: The id of the playlist to affect
 *   - name: playlistId
 *     in: path
 *     required: true
 *     example: 5fc9632dbd1238436c43c751
 *     description: The id of the item to move
 *   put:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsSavedItemsRearrangeItem
 *     summary: "Saved Items - Rearrange Item"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Moves the specified Saved Items item to a new position within the Saved Items array
 *
 *       Calling this endpoint will not affect the `executed_time_utc` value of any items on the Saved Items list.
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

async function rearrangeSavedItem(req, res) {
  if (typeof req.body.toIndex === 'undefined') {
    return res.status(422).json('The required parameters were not provided');
  }

  //get the elemnt we'll be moving
  db.Playlist.findOne({ _id: req.params.playlistId })
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        return res.status(422).json('Playlist does not exist');
      }

      let itemToMove = dbPlaylist.saved_items.filter(
        s => String(s._id) === req.params.itemId,
      )[0];

      if (typeof itemToMove === 'undefined') {
        return res.status(422).json('Could not find matching itemId');
      }

      //remove the element at its current position
      db.Playlist.update(
        { _id: req.params.playlistId },
        {
          $pull: { saved_items: { _id: req.params.itemId } },
        },
      )
        .then(dbPlaylist => {
          db.Playlist.update(
            { _id: req.params.playlistId },
            {
              $push: {
                saved_items: {
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

module.exports = rearrangeSavedItem;
