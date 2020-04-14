const db = require('../../models');

const moment = require('moment-timezone');
const keys = require('../../config/keys');
const { Parser } = require('json2csv');

// guidelines for generating this file are at
//https://digitalservices.npr.org/playlist-log-file-guidelines?utm_source=&utm_medium=email&utm_content=20190625&utm_campaign=&utm_term=

function soundExchangeReport(req, res) {
  let { from, to } = req.query;

  let match_query = { 'saved_items.track': { $ne: null } };
  if (from != null && to != null) {
    match_query['saved_items.executed_time_utc'] = {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  } else if (from != null) {
    match_query['saved_items.executed_time_utc'] = { $gte: new Date(from) };
  } else if (to != null) {
    match_query['saved_items.executed_time_utc'] = { $lte: new Date(to) };
  }

  db.Playlist.aggregate([
    { $unwind: { path: '$saved_items' } },
    { $match: match_query },
    {
      $lookup: {
        from: 'library',
        localField: 'saved_items.track',
        foreignField: '_id',
        as: 'track_info',
      },
    },
    {
      $project: {
        executed_time_utc: {
          $max: [
            '$saved_items.executed_time_utc',
            '$saved_items.start_time_utc',
          ],
        },
        track_info: { $arrayElemAt: ['$track_info', 0] },
      },
    },

    {
      $lookup: {
        from: 'library',
        localField: 'track_info.album',
        foreignField: '_id',
        as: 'album_info',
      },
    },

    {
      $lookup: {
        from: 'library',
        localField: 'track_info.artists',
        foreignField: '_id',
        as: 'artists',
      },
    },
    {
      $project: {
        executed_time_utc: 1,
        track_info: 1,
        album_info: { $arrayElemAt: ['$album_info', 0] },
        artists: '$artists.name',
      },
    },
    {
      $sort: {
        executed_time_utc: 1,
      },
    },
  ])
    .then(soundExchangeData => {
      res.setHeader(
        'Content-disposition',
        'attachment; filename=soundExchange.txt',
      );
      res.set('Content-Type', 'text/plain');

      if (soundExchangeData.length === 0) {
        return res
          .status(200)
          .end('Start Time\tEnd Time\tDuration\tTitle\tArtist\tAlbum\tLabel');
      }

      const parser = new Parser({ delimiter: '\t' });
      const csv = parser.parse(
        soundExchangeData.map(t => {
          return {
            'Start Time': moment(t.executed_time_utc)
              .tz(keys.stationTimeZone)
              .format('YYYY-MM-DD HH:mm:ss'),
            'End Time': null, //not required, since duration is provided
            Duration: t.track_info.duration_in_seconds,
            Title: t.track_info.name,
            Artist: t.artists.join(', '),
            Album: t.album_info.name,
            Label: t.album_info.label,
          };
        }),
      );

      return res.status(200).end(csv);
    })
    .catch(err => {
      console.error(err);
      return res.status(422).json(err);
    });
}

module.exports = soundExchangeReport;
