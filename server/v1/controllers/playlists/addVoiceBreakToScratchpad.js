const db = require('../../models');

async function addVoiceBreakToScratchpad(req, res) {
  if (typeof req.params.playlistId === 'undefined') {
    res.status(422).json('The required parameters were not provided');
  }

  db.Playlist.findOneAndUpdate(
    {
      _id: req.params.playlistId,
    },
    {
      $push: {
        scratchpad: {
          type: 'voice_break',
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
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = addVoiceBreakToScratchpad;
