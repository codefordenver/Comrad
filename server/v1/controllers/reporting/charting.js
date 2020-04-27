const db = require('../../models');

const moment = require('moment-timezone');
const keys = require('../../config/keys');
const { Parser } = require('json2csv');

function charting(req, res) {
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
      $project: {
        album_info: { $arrayElemAt: ['$album_info', 0] },
      },
    },
    {
      $lookup: {
        from: 'library',
        localField: 'album_info.artist',
        foreignField: '_id',
        as: 'artist',
      },
    },

    {
      $lookup: {
        from: 'genres',
        localField: 'album_info.genre',
        foreignField: '_id',
        as: 'genre',
      },
    },
    {
      $project: {
        album_info: 1,
        genre: { $arrayElemAt: ['$genre', 0] },
        artist: { $arrayElemAt: ['$artist', 0] },
      },
    },
    {
      $project: {
        album_id: '$album_info._id',
        name: '$album_info.name',
        artist: '$artist.name',
        add_date: '$album_info.created_at',
        label: '$album_info.label',
        genre: '$genre.name',
      },
    },

    {
      $group: {
        _id: '$album_id',
        plays: { $sum: 1 },
        album_title: { $first: '$name' },
        artist: { $first: '$artist' },
        add_date: { $first: '$add_date' },
        label: { $first: '$label' },
        genre: { $first: '$genre' },
      },
    },
    {
      $sort: {
        genre: 1,
        plays: -1,
      },
    },
  ])
    .then(albumsForCharting => {
      res.setHeader('Content-disposition', 'attachment; filename=charting.csv');
      res.set('Content-Type', 'text/csv');

      if (albumsForCharting.length === 0) {
        return res
          .status(200)
          .end('plays,album_title,artist,add_date,label,genre');
      }

      const parser = new Parser();
      const csv = parser.parse(
        albumsForCharting.map(t => {
          return {
            plays: t.plays,
            album_title: t.album_title,
            artist: t.artist,

            label: t.label,
            add_date: moment(t.add_date)
              .tz(keys.stationTimeZone)
              .format('YYYY-M-D h:mm:ss a'),
            genre: t.genre,
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

module.exports = charting;
