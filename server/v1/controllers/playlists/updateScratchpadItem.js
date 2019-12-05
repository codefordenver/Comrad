const db = require('../../models');

async function updateScratchpadItem(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' &&
    typeof req.params.itemId === 'undefined'
  ) {
    return res.status(422).json('The required parameters were not provided');
  }
  // todo: implement this
  //need to update scratchpad item based on:
  //req.body

  //db.Playlist.findOne({ _id: req.params.playlistId })

  //.catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = updateScratchpadItem;
