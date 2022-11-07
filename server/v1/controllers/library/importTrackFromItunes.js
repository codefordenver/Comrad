/**
 * @swagger
 *
 * /library/from-itunes:
 *   put:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: ImportTrackFromItunes
 *     summary: Import Track From Itunes
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Import a track from the iTunes API.
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
const { 
  findItunesByCollectionId: utils__findItunesByCollectionId,
  updateSearchIndex,
 } = require('./utils')

async function importTrackFromItunes(req, res) { 
  let trackData = req.body;

  console.log('data submitted to importTrackFromItunes', trackData);

  // we need to see if there's an album matching the itunes id
  let dbAlbum = await db.Library.findOne({"itunes_id": trackData.album.itunes_id});

  if (!dbAlbum) {
    let {
      album,
    } = await utils__findItunesByCollectionId(trackData.album.itunes_id);

    let dbGenre = await db.Genre.findOne({"name": album['primaryGenreName']});

    let dbArtist = await db.Library.findOne({
        "name": album['artist'],
        "type": "artist"
      });
    if (!dbArtist) {
      dbArtist = await db.Library.create({
        "name": album['artist'],
        "type": "artist"
      });
    }

    dbAlbum = await db.Library.create({
        "name": album['title'],
        "type": "album",
        "compilation": album['compilation'],
        "artist": dbArtist['_id'],
        "itunes_id": trackData.album.itunes_id,
        "genre": dbGenre ? dbGenre["_id"] : null,
        "label": album['copyright']
    });
  }

  let {
    album,
    tracks,
    localAlbum
  } = await utils__findItunesByCollectionId(trackData.album.itunes_id);

  // import the itunes data

  let dbTrackArtist = await db.Library.findOne({
    "name": trackData['artists'][0]['name'],
    "type": "artist"
  });
  if (!dbTrackArtist) {
    dbTrackArtist = await db.Library.create({
      "name": trackData['artists'][0]['name'],
      "type": "artist"
    });
  }
  let createdTrack = await db.Library.create({
    'name': trackData['name'],
    'type': 'track',
    'artists': [dbTrackArtist['_id']],
    'album': dbAlbum['_id'],
    'disk_number': trackData['disk_number'],
    'track_number': trackData['track_number'],
    'duration_in_seconds': trackData['duration_in_seconds']
  });

  let dbTrack = await db.Library.findOne({"_id": createdTrack._id})
    .populate(['artist', 'artists', 'album']);

  await updateSearchIndex(dbAlbum); 

  return res.json(dbTrack);
}

module.exports = importTrackFromItunes;
