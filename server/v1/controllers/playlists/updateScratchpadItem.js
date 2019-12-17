const db = require('../../models');

async function updateScratchpadItem(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' &&
    typeof req.params.itemId === 'undefined'
  ) {
    return res.status(422).json('The required parameters were not provided');
  }

  let updateObj = {};

  Object.keys(req.body).forEach(k => {
    updateObj['scratchpad.$.' + k] = req.body[k];
  });

  db.Playlist.updateOne(
    { _id: req.params.playlistId, 'scratchpad._id': req.params.itemId },
    { $set: updateObj },
  )
    .then(dbPlaylist => {
      return res.status(200).json({});
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = updateScratchpadItem;
