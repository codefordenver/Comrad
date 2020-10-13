/**
 * @swagger
 *
 * /recent-plays:
 *   get:
 *     tags:
 *     - Simple Endpoints
 *     - Playlists
 *     operationId: RecentPlays
 *     summary: Recent Plays
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Returns the 10 most recents items played. Items can be tracks, voice breaks, comments, or traffic. Only returns items from the past 24 hours.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         description: Array of the 10 most recent items played
 *         content:
 *           application/json:
 *             schema:
 *               title: Array of items played
 *               type: "array"
 *               description: Array of objects, where each object is an item played. Array appears in the order the items were played.
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     title: type
 *                     type: string
 *                     description: "The type of item. Possible values: `track`, `traffic`, `comment, `voice_break`"
 *                     enum:
 *                     - track
 *                     - comment
 *                     - traffic
 *                     - voice_break
 *             example:
 *             - type: track
 *               track:
 *                 name: Morning Morning
 *                 album: Second Album
 *                 album_artist: The Fugs
 *                 artists:
 *                 - The Fugs
 *                 duration_in_seconds: 129
 *             - type: track
 *               track:
 *                 name: Watt
 *                 album: Floored by Four
 *                 album_artist: Floored by Four
 *                 artists:
 *                 - Floored by Four
 *                 duration_in_seconds: 237
 *             - type: traffic
 *               traffic:
 *                 type: Legal ID
 *                 title: Legal Id
 *             - type: track
 *               track:
 *                 name: Restless
 *                 album: Toss Up
 *                 album_artist: Kevin Krauter
 *                 artists:
 *                 - Kevin Krauter
 *                 duration_in_seconds: 183
 *             - type: traffic
 *               traffic:
 *                 type: Legal ID
 *                 title: Legal Id
 *             - type: voice_break
 *             - type: track
 *               track:
 *                 name: Clash
 *                 album: Fantasma
 *                 album_artist: Cornelius
 *                 artists:
 *                 - Cornelius
 *                 duration_in_seconds: 356
 *             - type: track
 *               track:
 *                 name: Clash
 *                 album: Night Wave
 *                 album_artist: Yuko Fujiyama
 *                 artists:
 *                 - Yuko Fujiyama
 *                 duration_in_seconds: 60
 *             - type: traffic
 *               traffic:
 *                 type: Announcement
 *                 title: Ongoing Promo
 *             - type: comment
 *               description: "<p>test comment</p>"
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const { populatePlaylist } = require('./utils');

async function recentPlays(req, res) {
  let endDate = new Date();
  let startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);

  const dbPlays = await db.Playlist.aggregate([
    {
      $match: {
        $or: [
          { start_time_utc: { $lte: endDate, $gte: startDate } },
          { end_time_utc: { $lte: endDate, $gte: startDate } },
        ],
      },
    },
    { $unwind: { path: '$saved_items' } },
    {
      $lookup: {
        from: 'library',
        localField: 'saved_items.track',
        foreignField: '_id',
        as: 'saved_items.track',
      },
    },
    {
      $set: {
        'saved_items.track': { $arrayElemAt: ['$saved_items.track', 0] },
      },
    },
    {
      $lookup: {
        from: 'library',
        localField: 'saved_items.track.album',
        foreignField: '_id',
        as: 'saved_items.track.album',
      },
    },
    {
      $set: {
        'saved_items.track.album': {
          $arrayElemAt: ['$saved_items.track.album', 0],
        },
      },
    },
    {
      $lookup: {
        from: 'library',
        localField: 'saved_items.track.album.artist',
        foreignField: '_id',
        as: 'saved_items.track.album.artist',
      },
    },
    {
      $set: {
        'saved_items.track.album.artist': {
          $arrayElemAt: ['$saved_items.track.album.artist', 0],
        },
      },
    },
    {
      $lookup: {
        from: 'library',
        localField: 'saved_items.track.artists',
        foreignField: '_id',
        as: 'saved_items.track.artists',
      },
    },
    {
      $lookup: {
        from: 'traffic',
        localField: 'saved_items.traffic',
        foreignField: '_id',
        as: 'saved_items.traffic',
      },
    },
    {
      $set: {
        'saved_items.traffic': { $arrayElemAt: ['$saved_items.traffic', 0] },
      },
    },
    { $sort: { end_time_utc: -1, 'saved_items.executed_time_utc': 1 } },
    {
      $project: {
        _id: 0,
        type: '$saved_items.type',
        description: '$saved_items.description',
        track: {
          name: '$saved_items.track.name',
          album: '$saved_items.track.album.name',
          album_artist: '$saved_items.track.album.artist.name',
          artists: '$saved_items.track.artists.name',
          duration_in_seconds: '$saved_items.track.duration_in_seconds',
        },
        traffic: {
          type: '$saved_items.traffic.traffic_details.type',
          title: '$saved_items.traffic.traffic_details.title',
        },
      },
    },
  ]);

  //delete empty properties
  dbPlays.forEach(function(p) {
    if (Object.keys(p.traffic).length === 0) {
      delete p.traffic;
    }
    if (Object.keys(p.track).length === 1 && p.track.artists.length === 0) {
      delete p.track;
    }
  });

  return res.status(200).json(dbPlays);
}

module.exports = recentPlays;
