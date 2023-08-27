/**
 * @swagger
 *
 * /library/itunes/{id}:
 *   post:
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
 *       description: The collection ID to import
 *     description: |
 *       Import a collection (album) from the iTunes API.
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
const { 
  findItunesByCollectionId: utils__findItunesByCollectionId,
  updateSearchIndex,
 } = require('./utils')

async function importItunesAlbum(req, res) { 
  let { id } = req.params;

  if (!id) {
    return res.json(null);
  }

  let {
    album,
    tracks,
    localAlbum
  } = await utils__findItunesByCollectionId(id);

  // import the itunes data

  let dbAlbum;

  if (!localAlbum) {

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


    var albumData = {
        "name": album['title'],
        "type": "album",
        "compilation": album['compilation'],
        "artist": dbArtist['_id'],
        "itunes_id": id,
        "genre": dbGenre ? dbGenre["_id"] : null,
        "label": album['copyright'],
        'custom.album_art_url': album['albumArt'],
    };

    //START: this code is duplicated in create.js and in importItunesAlbum.js and importTrackFromItunes.js
    let autoIncrementField = null;
    if ('album' in keys.modelCustomFields) {
      keys.modelCustomFields.album.forEach(function(a) {
        if (a.kgnuCustomFunctionalityAutoIncrement != null && a.kgnuCustomFunctionalityAutoIncrement) {
          autoIncrementField = a;
        }
      });
    }
    if (autoIncrementField) {
      // let highestRecord = await db.Library.find({"type":"album"}).sort("-custom." + autoIncrementField.name)
      //   .collation({locale: "en_US", numericOrdering: true}).limit(1);
      let highestRecord = await db.Library.aggregate([
        {"$match": {"type": "album"}},
        {"$addFields": {
          "library_number_as_int": {
            "$convert": {
              "input": "$custom.library_number",
              "to": "long",
              "onError": 0 // ignore non-number library numbers (some have characters)
            }
          }
        }},
        {"$sort": {
          "library_number_as_int": -1
        }},
        {"$limit": 1}
      ]);

      let autoIncrementValue = Number(highestRecord[0]['custom'][autoIncrementField.name]);
      autoIncrementValue++;
      albumData['custom.' + autoIncrementField.name] = autoIncrementValue;
      console.log('using this value for custom.' + autoIncrementField.name, autoIncrementValue);
    }
    //END: this code is duplicated in create.js and in importItunesAlbum.js and importTrackFromItunes.js

    albumData['custom.in_kgnu_library'] = true;

    dbAlbum = await db.Library.create(albumData);
  } else {
    dbAlbum = localAlbum;
  }

  // create each track
  for (var i = 0; i < tracks.length; i++) {
    let t = tracks[i];
    if (localAlbum && localAlbum.tracks.find(localTrack => localTrack.name.toLowerCase() == t['name'].toLowerCase())) {
      console.log("track already exists, skipping import: " + t['name']);
      continue;
    }
    let dbArtist = await db.Library.findOne({
      "name": t['artistName'],
      "type": "artist"
    });
    if (!dbArtist) {
      dbArtist = await db.Library.create({
        "name": t['artistName'],
        "type": "artist"
      });
    }
    await db.Library.create({
      'name': t['name'],
      'type': 'track',
      'artists': [dbArtist['_id']],
      'album': dbAlbum['_id'],
      'disk_number': t['diskNumber'],
      'track_number': t['trackNumber'],
      'duration_in_seconds': t['duration']
    });
  }

  let refreshedAlbumFromDb = await db.Library.findOne({"_id": dbAlbum['_id']});  // run db.Library.findOne again to get the Mongoose object (localAlbum can be converted to object)
  await updateSearchIndex(refreshedAlbumFromDb); 

  return res.json({"album_id": dbAlbum['_id']});
}

module.exports = importItunesAlbum;
