/**
 * @swagger
 *
 * /playlists/:playlistId/saved-items/:itemId:
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
 *     description: The id of the item to move to the scratchpad
 *   delete:
 *     tags:
 *     - Playlists
 *     operationId: PlaylistsMoveItemFromSavedItemsToScratchpad
 *     summary: "Scratchpad - Move Item to Saved Items"
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Moves the specified item from Saved Items to Scratchpad, within a playlist.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`. The `DJ` role can also access the endpoint when the playlist spans a show where the user is a host.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             description: Returns the item that was moved
 *             schema:
 *               example:
 *                 _id: 5fc96318bd1238436c43c74c
 *                 type: track
 *                 track:
 *                   popularity: 0
 *                   _id: 5f72109dab735642446ae259
 *                   name: Mile After Mile
 *                   album:
 *                     popularity: 0
 *                     _id: 5f720f0b66320235249c156d
 *                     name: Easy Livin'
 *                     artist: 5f720eda66320235249a336e
 *                     label: Blind Pig Records
 *                     genre: 5f720ef466320235249b2d97
 *                     compilation: false
 *                     created_at: '2013-06-23T00:01:14.000Z'
 *                     custom:
 *                       itunes_id: '596610087'
 *                       old_comrad_id: '44122'
 *                       local:
 *                       location: Personal
 *                       library_number: '44122'
 *                     type: album
 *                     updated_at: '2020-09-28T16:27:55.577Z'
 *                   track_number: 4
 *                   disk_number: 1
 *                   duration_in_seconds: 136
 *                   custom:
 *                     old_comrad_id: '295468'
 *                   type: track
 *                   artists:
 *                   - popularity: 0
 *                     _id: 5f720eda66320235249a336e
 *                     name: Southern Hospitality
 *                     type: artist
 *                     created_at: '2020-09-28T16:27:06.778Z'
 *                     updated_at: '2020-09-28T16:27:06.778Z'
 *                   created_at: '2020-09-28T16:34:37.153Z'
 *                   updated_at: '2020-09-28T16:34:37.153Z'
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

async function moveItemFromSavedItemsToScratchpad(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' ||
    typeof req.params.itemId === 'undefined'
  ) {
    return res.status(422).json('The required parameters were not provided');
  }

  let movedItem;

  db.Playlist.findOne({ _id: req.params.playlistId })
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        return res.status(422).json('Playlist does not exist');
      }

      // find the item
      movedItem = dbPlaylist.saved_items.filter(
        i => String(i._id) === String(req.params.itemId),
      );

      if (movedItem.length === 0) {
        return res.status(422).json('Item does not exist');
      }

      movedItem = movedItem[0];

      //clear out data before inserting this record into scratchpad
      if (typeof movedItem.executed_time_utc !== 'undefined') {
        delete movedItem.executed_time_utc;
      }

      return db.Playlist.update(
        {
          _id: req.params.playlistId,
        },
        {
          $pull: {
            saved_items: {
              _id: req.params.itemId,
            },
          },
        },
      );
    })
    .then(dbResult => {
      //we won't add traffic onto the scratchpad
      if (movedItem.type === 'traffic') {
        return res.json([]);
      }

      return db.Playlist.findOneAndUpdate(
        {
          _id: req.params.playlistId,
        },
        {
          $push: {
            scratchpad: movedItem,
          },
        },
        { new: true },
      );
    })
    .then(dbPlaylist => {
      return populatePlaylist(dbPlaylist)
        .then(dbPlaylist => {
          return res.json(
            dbPlaylist.scratchpad[dbPlaylist.scratchpad.length - 1],
          ); //return the scratchpad item that was moved
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = moveItemFromSavedItemsToScratchpad;
