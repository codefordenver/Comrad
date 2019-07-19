const db = require('../../models');

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

  res.status(200).json(dbPlaylist[0]);
}

module.exports = findOne;
