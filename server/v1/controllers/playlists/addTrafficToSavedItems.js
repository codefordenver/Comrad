const db = require('../../models');
const { populateTrafficInstance } = require('./utils');

async function addTrafficToSavedItems(req, res) {
  if (
    typeof req.params.playlistId === 'undefined' ||
    typeof req.body.masterTimeId === 'undefined'
  ) {
    res.status(422).json('The required parameters were not provided');
  }

  let newTrafficItem = {
    type: 'traffic',
    executed_time_utc: Date.now(),
  };

  let masterTimeId = req.body.masterTimeId;
  let trafficParts = masterTimeId.split('-');
  newTrafficItem.traffic = trafficParts[0];
  newTrafficItem.master_time_id = masterTimeId;

  db.Playlist.findOneAndUpdate(
    {
      _id: req.params.playlistId,
    },
    {
      $push: {
        saved_items: newTrafficItem,
      },
    },
    { new: true },
  )
    .then(dbPlaylist =>
      db.Playlist.populate(dbPlaylist, ['saved_items.traffic']),
    )
    .then(dbPlaylist => {
      if (!dbPlaylist) {
        res.status(422).json('Playlist does not exist');
      }
      let trafficItem =
        dbPlaylist.saved_items[dbPlaylist.saved_items.length - 1];
      trafficItem.traffic = populateTrafficInstance(
        trafficItem.traffic,
        trafficItem.master_time_id,
        dbPlaylist.start_time_utc,
        dbPlaylist.end_time_utc,
      );
      return res.json(trafficItem);
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json({ errorMessage: err });
    });
}

module.exports = addTrafficToSavedItems;
