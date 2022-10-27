/**
 * @swagger
 *
 * /library/itunes/{id}:
 *   get:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: FindItunesAlbum
 *     summary: Find iTunes Album
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: id
 *       required: true
 *       in: path
 *       type: string
 *       description: The collection ID to return
 *     description: |
 *       Display a collection (album) from the iTunes API.
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

async function findItunesByCollectionId(req, res) {
  let { id } = req.params;

  if (!id) {
    return res.json(null);
  }

  let itunesResponse = await axios.get('http://itunes.apple.com/lookup?id=' + encodeURIComponent(id) + '&entity=song&limit=500');

  var data = itunesResponse.data;

  var album = null;
  var tracks = [];


  data.results.forEach(d => {
    if (album == null && d['wrapperType'] == 'collection') {
      album = {
        'id': d['collectionId'],
        'title': d['title'],
        'artist': d['artistName'],
        'albumArt': d['artworkUrl100'],
        'genre': d['primaryGenreName'],
        'trackCount': d['trackCount'],
        'copyright': d['copyright'],
        'compilation': d['collectionType'] == 'Compilation' || d['artistName'] == 'Various Artists'
      };
    } else if (d['wrapperType'] == 'track') {
      tracks.push({
        'name': d['trackName'],
        'artistName': d['artistName'],
        'previewUrl': d['previewUrl'],
        'diskNumber': d['discNumber'],
        'trackNumber': d['trackNumber'],
        'duration': Math.ceil(d['trackTimeMillis'] / 1000)
      });
    }
  });

  if (!album) {
    console.log('album not found in itunes');
    return res.json(null);
  }

  // check if album has already been imported
  let localAlbum = await db.Library.findOne({'itunes_id': id});
  
  return res.json({
    localAlbum,
    album,
    tracks
  });
}

module.exports = findItunesByCollectionId;
