const db = require('../../models');
const { populatePlaylist } = require('./utils');

async function rearrangeScratchpadItem(req, res) {
  if (typeof req.body.toIndex === 'undefined') {
    return res.status(422).json('The required parameters were not provided');
  }

  //get the elemnt we'll be moving
  db.Playlist.findOne({ _id: req.params.playlistId })
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        return res.status(422).json('Playlist does not exist');
      }

      let itemToMove = dbPlaylist.scratchpad.filter(
        s => String(s._id) === req.params.itemId,
      )[0];

      if (itemToMove === null) {
        return res.status(422).json('Could not find matching itemId');
      }

      //remove the element at its current position
      db.Playlist.update(
        { _id: req.params.playlistId },
        {
          $pull: { scratchpad: { _id: req.params.itemId } },
        },
      )
        .then(dbPlaylist => {
          db.Playlist.update(
            { _id: req.params.playlistId },
            {
              $push: {
                scratchpad: {
                  $each: [itemToMove],
                  $position: req.body.toIndex,
                },
              },
            },
          )
            .then(dbPlaylist => {
              return res.status(200).json({});
            })
            .catch(err => res.status(422).json({ errorMessage: err }));
        })
        .catch(err => res.status(422).json({ errorMessage: err }));
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = rearrangeScratchpadItem;
