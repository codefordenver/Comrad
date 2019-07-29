const db = require('../../models');
const { populatePlaylist } = require('./utils');

async function findOne(req, res) {
  if (
    typeof req.query.startTime === 'undefined' ||
    typeof req.query.endTime === 'undefined'
  ) {
    res
      .status(422)
      .json('You must provide the startTime and endTime parameters');
  }

  const dbPlaylist = await db.Playlist.findOne({
    start_time_utc: req.query.startTime,
    end_time_utc: req.query.endTime,
  });

  if (!dbPlaylist) {
    res.status(422).json('Playlist does not exist');
  }

  let objPlaylist = await populatePlaylist(dbPlaylist);

  res.status(200).json(objPlaylist);
}

module.exports = findOne;
