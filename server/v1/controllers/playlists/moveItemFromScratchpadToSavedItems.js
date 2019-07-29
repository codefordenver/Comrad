const db = require('../../models');

async function moveItemFromScratchpadToSavedItems(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' ||
    typeof req.body.itemId === 'undefined'
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
      movedItem = dbPlaylist.scratchpad.filter(
        i => String(i._id) === String(req.body.itemId),
      );

      if (movedItem.length === 0) {
        return res.status(422).json('Item does not exist');
      }

      movedItem = movedItem[0];

      //clear out data before inserting this record into saved_items
      if (typeof movedItem.occurs_after_time_utc !== 'undefined') {
        delete movedItem.occurs_after_time_utc;
      }
      if (typeof movedItem.occurs_before_time_utc !== 'undefined') {
        delete movedItem.occurs_before_time_utc;
      }
      movedItem.executed_time_utc = Date.now();

      return db.Playlist.update(
        {
          _id: req.params.playlistId,
        },
        {
          $pull: {
            scratchpad: {
              _id: req.body.itemId,
            },
          },
        },
      );
    })
    .then(dbResult => {
      return db.Playlist.findOneAndUpdate(
        {
          _id: req.params.playlistId,
        },
        {
          $push: {
            saved_items: movedItem,
          },
        },
        { new: true },
      );
    })
    .then(dbPlaylist => {
      return res.json(
        dbPlaylist.saved_items[dbPlaylist.saved_items.length - 1],
      ); //return the item that was moved
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = moveItemFromScratchpadToSavedItems;
