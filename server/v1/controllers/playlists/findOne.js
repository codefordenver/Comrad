const db = require('../../models');
const {
  utils: { allShowInstancesInDateRange },
  utils__mongoose: { master_time_id__byShowType },
} = require('../shows/utils');

async function findOne(req, res) {
  if (
    typeof req.query.startTime === 'undefined' ||
    typeof req.query.endTime === 'undefined'
  ) {
    res
      .status(422)
      .json('You must provide the startTime and endTime parameters');
  }

  const dbPlaylist = await db.Playlist.find({
    start_time_utc: req.query.startTime,
    end_time_utc: req.query.endTime,
  })
    .populate({
      path: 'scratchpad.track',
      populate: 'artists',
    })
    .populate({
      path: 'saved_items.track',
      populate: 'artists',
    })
    .populate('saved_items.traffic');

  if (!dbPlaylist) {
    res.status(422).json('Playlist does not exist');
  }

  let docPlaylist = dbPlaylist[0];
  let objPlaylist = docPlaylist.toObject();
  for (var i = 0; i < docPlaylist.saved_items.length; i++) {
    let docSavedItems = docPlaylist.saved_items[i];
    if (typeof docSavedItems.traffic !== 'undefined') {
      let instances = allShowInstancesInDateRange(
        docSavedItems.traffic,
        docPlaylist.start_time_utc,
        docPlaylist.end_time_utc,
      );
      if (instances.length > 1) {
        console.error(
          'More than one instance of a traffic series within a playlist: ' +
            docPlaylist._id,
        );
      }
      objPlaylist.saved_items[i].traffic = instances[0];
    }
  }

  res.status(200).json(objPlaylist);
}

module.exports = findOne;
