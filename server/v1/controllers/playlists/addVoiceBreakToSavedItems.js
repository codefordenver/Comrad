const db = require('../../models');

async function addVoiceBreakToSavedItems(req, res) {
  if (typeof req.params.playlistId === 'undefined') {
    res.status(422).json('The required parameters were not provided');
  }

  db.Playlist.findOneAndUpdate(
    {
      _id: req.params.playlistId,
    },
    {
      $push: {
        saved_items: {
          type: 'voice_break',
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
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = addVoiceBreakToSavedItems;
