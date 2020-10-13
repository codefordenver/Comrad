const db = require('../../models');
const { findOrCreatePlaylist } = require('./utils');

async function findOrCreateOne(req, res) {
  if (
    typeof req.query.startTime === 'undefined' ||
    typeof req.query.endTime === 'undefined'
  ) {
    res
      .status(422)
      .json('You must provide the startTime and endTime parameters');
  }

  let playlist = await findOrCreatePlaylist(
    req.query.startTime,
    req.query.endTime,
  );

  res.status(200).json(playlist);
}

module.exports = findOrCreateOne;
