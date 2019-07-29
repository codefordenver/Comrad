const db = require('../../models');

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
      return res.json(dbPlaylist.scratchpad[dbPlaylist.scratchpad.length - 1]); //return the scratchpad item that was moved
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = moveItemFromSavedItemsToScratchpad;
