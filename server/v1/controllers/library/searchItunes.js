/**
 * @swagger
 *
 * /library/search-itunes:
 *   get:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: SearchItunes
 *     summary: Search Itunes
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: q
 *       required: true
 *       in: query
 *       type: string
 *       description: The string to search for
 *     description: |
 *       Search for albums in itunes to import to the library.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const keys = require('../../config/keys');
const axios = require('axios');



async function search(req, res) {
  let { q } = req.query;

  if (!q) {
    return res.json([]);
  }


  var itunesResponseError = false;
  let itunesResponse = await axios.get('http://itunes.apple.com/search?term=' + encodeURIComponent(q) +  '&entity=album&limit=60').catch(err => {
    console.error('itunes response error: ', err);
    itunesResponseError = true;
  });

  if (itunesResponseError) {
    return res.json([]);
  }


  var data = itunesResponse.data;

  let iTunesIds = [];
  let albumNames = [];
  data.results.forEach(album => {
    iTunesIds.push(album['collectionId']);
    albumNames.push(new RegExp(
      album['collectionName'].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape all special characters
      , "i"
    )); // case insensitive search
  });

  //find local albums using this iTunesId
  let localAlbums = await db.Library.find({
    "type": "album",
    "$or": [
      {"itunes_id": { "$in": iTunesIds }},
      {"name": { "$in": albumNames }}
    ]
  })
  .populate('artist')
  .catch(err => {
    console.error('db.library.find error: ', err);
  });;

  for (var i = 0; i < data.results.length; i++) {
    let album = data.results[i];
    let localAlbum = null;
    localAlbum = localAlbums.find(a => a['itunes_id'] == album['collectionId']);
    if (!localAlbum) {
      localAlbum = localAlbums.find(a => 
        album['collectionName'].toLowerCase() == a['name'].toLowerCase() && 
        a['artist'] 
        && album['artistName'].toLowerCase() == a['artist']['name'].toLowerCase());
    }
    if (localAlbum) {
      data.results[i]['local_id'] = localAlbum['_id'];
      data.results[i]['local_track_count'] = await db.Library.countDocuments({ "type": "track", "album": localAlbum['_id'] });

      // The iTunes 'trackCount' field counts an extra "track" for each disc, so we need to add
      // the local disc count to the local track count when comparing to figure out if the album
      // has been entirely imported.

      let numDiscs = 0;
      let maxTrack = await db.Library.find({ "type": "track", "album": localAlbum['_id'] })
        .sort({ "disk_number": -1 })
        .limit(1);
      if (maxTrack.length > 0) {
        numDiscs = maxTrack[0]['disk_number'];
      }

      data.results[i]['is_partial_import'] = album['trackCount'] > data.results[i]['local_track_count'] + numDiscs;
    }

  }
        

  return res.json(data.results);
}

module.exports = search;
