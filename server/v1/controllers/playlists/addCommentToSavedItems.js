const db = require('../../models');

async function addCommentToSavedItems(req, res) {
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
        saved_items: {
          type: 'comment',
          description: req.body.description,
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

module.exports = addCommentToSavedItems;
