const db = require('../../models');

const moment = require('moment-timezone');
const keys = require('../../config/keys');
const { Parser } = require('json2csv');

// guidelines for generating this file are at
//https://digitalservices.npr.org/playlist-log-file-guidelines?utm_source=&utm_medium=email&utm_content=20190625&utm_campaign=&utm_term=

// start time for tracks may be more accurate using the executed_time_utc property since that is when the DJ moved the item to Saved Items
// but, for consistency with the old Comrad system, we will have the first track of the playlist start at the beginning of the show,
// and then it will "stack" tracks so that the next track is listed as starting as soon as the other track ends
// the commit at fcfaf689 used a method with executed_time_utc if we ever need to retrieve this

function soundExchangeReport(req, res) {
  let { from, to } = req.query;

  let match_query = { 'saved_items.track': { $ne: null } };
  if (from != null && to != null) {
    match_query.start_time_utc = {
      $gte: new Date(from),
      $lte: new Date(to),
    };
  } else if (from != null) {
    match_query.start_time_utc = { $gte: new Date(from) };
  } else if (to != null) {
    match_query.start_time_utc = { $lte: new Date(to) };
  }

  db.Playlist.aggregate([
    { $sort: { start_time_utc: 1 } },
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
        time_utc: '$start_time_utc',
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
        time_utc: 1,
        track_info: 1,
        album_info: { $arrayElemAt: ['$album_info', 0] },
        artists: '$artists.name',
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
      var playlistCounter, playlistStartTime;
      const csv = parser.parse(
        soundExchangeData.map(t => {
          // see explanation at the top of this file for how we are calculating start time
          console.log('start');
          console.log(playlistStartTime);
          console.log(typeof t.time_utc);
          console.log(t.time_utc);
          console.log(typeof playlistStartTime);
          console.log(playlistCounter);
          if (String(playlistStartTime) !== String(t.time_utc)) {
            console.log('reset');
            playlistStartTime = t.time_utc;
            playlistCounter = 0;
          }
          console.log(playlistStartTime);
          console.log(playlistCounter);

          let startTime = moment(t.time_utc);
          startTime.add(playlistCounter, 'seconds');

          playlistCounter += t.track_info.duration_in_seconds;

          console.log(playlistCounter);

          return {
            'Start Time': startTime.format('YYYY-MM-DD HH:mm:ss'),
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
