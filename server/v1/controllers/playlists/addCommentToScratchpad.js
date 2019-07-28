const db = require('../../models');

async function addCommentToScratchpad(req, res) {
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
        scratchpad: {
          type: 'comment',
          description: req.body.description,
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

module.exports = addCommentToScratchpad;
