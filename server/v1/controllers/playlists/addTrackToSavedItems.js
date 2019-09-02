const db = require('../../models');
const { populatePlaylist } = require('./utils');

async function addTrackToSavedItems(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' ||
    typeof req.body.trackId === 'undefined'
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
          type: 'track',
          track: req.body.trackId,
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
      return populatePlaylist(dbPlaylist)
        .then(dbPlaylist => {
          return res.json(
            dbPlaylist.saved_items[dbPlaylist.saved_items.length - 1],
          );
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = addTrackToSavedItems;
