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
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = deleteItemFromScratchpad;
