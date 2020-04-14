const db = require('../../models');
const { populatePlaylist } = require('./utils');

async function addTrackToScratchpad(req, res) {
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
        scratchpad: {
          type: 'track',
          track: req.body.trackId,
        },
      },
    },
    { new: true },
  )
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        return res.status(422).json('Playlist does not exist');
      }
      return populatePlaylist(dbPlaylist)
        .then(dbPlaylist => {
          return res.json(
            dbPlaylist.scratchpad[dbPlaylist.scratchpad.length - 1],
          );
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = addTrackToScratchpad;
