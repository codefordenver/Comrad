/**
 * @swagger
 *
 * /library:
 *   post:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: CreateLibrary
 *     summary: Create
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Create a new Library record
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Music Library Admin`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Library'
 *         required: true
 *         description: "Library object to be added"
 *     responses:
 *       200:
 *         description: The Library record was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: Library
 *               example:
 *                 "popularity": 0
 *                 "_id": "5f5fd9ebfa3e4138f8d38ecd"
 *                 "name": "An API Artist"
 *                 "type": "artist"
 *                 "created_at": "2020-09-14T21:00:27.381Z"
 *                 "updated_at": "2020-09-14T21:00:27.381Z"
 *                 "__v": 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const db = require('../../models');
const keys = require('../../config/keys');
const {
  updateSearchIndex,
  validateAlbumData,
  validateArtistData,
  validateTrackData,
} = require('./utils');

function create(req, res) {
  if (typeof req.body.type === 'undefined') {
    res.status(422).json({
      errorMessage: 'type is required',
    });
    return;
  }
  if (typeof req.body.name === 'undefined') {
    res.status(422).json({
      errorMessage: 'name is required',
    });
    return;
  }

  switch (req.body.type) {
    case 'album':
      return validateAlbumData(req.body)
        .then(albumData => {

          if (req.body.fromShowBuilderModal) {
            //START: this code is duplicated in create.js and in importItunesAlbum.js and importTrackFromItunes.js
            //        although, this version handles async differently
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
              return db.Library.aggregate([
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
              ]).then(highestRecord => {
                let autoIncrementValue = Number(highestRecord[0]['custom'][autoIncrementField.name]);
                autoIncrementValue++;
                albumData['custom.' + autoIncrementField.name] = autoIncrementValue;
                console.log('using this value for custom.' + autoIncrementField.name, autoIncrementValue);
                return albumData;
              });

              
            }
            //END: this code is duplicated in create.js and in importItunesAlbum.js and importTrackFromItunes.js
          }

          return albumData;
        })
        .then(albumData => {

          db.Library.create(albumData)
            .then(dbAlbum => db.Library.populate(dbAlbum, ['genre', 'artist']))
            .then(dbAlbum => updateSearchIndex(dbAlbum))
            .then(dbAlbum => res.json(dbAlbum))
            .catch(err => {
              console.error(err);
              return res.status(422).json(err)
            });
        })
        .catch(err => {
          console.error(err);
          res.status(422).json({
            errorMessage: err,
          });
        });
    case 'artist':
      return validateArtistData(req.body)
        .then(artistData => {
          db.Library.create(artistData)
            .then(dbArtist => updateSearchIndex(dbArtist))
            .then(dbArtist => res.json(dbArtist))
            .catch(err => {
              console.error(err);
              return res.status(422).json(err);
            });
        })
        .catch(err => {
          console.error(err);
          res.status(422).json({
            errorMessage: err,
          });
        });
    case 'track':
      return validateTrackData(req.body)
        .then(() => db.Library.create(req.body))
        .then(dbTrack => db.Library.populate(dbTrack, ['album', 'artists']))
        .then(dbTrack => updateSearchIndex(dbTrack))
        .then(dbTrack => res.json(dbTrack))
        .catch(err => {
          console.log(err);
          res.status(422).json({ errorMessage: err });
        });
    default:
      res.status(422).json({
        errorMessage: 'received an unexpected value for "type"',
      });
      return;
  }
}

module.exports = create;
