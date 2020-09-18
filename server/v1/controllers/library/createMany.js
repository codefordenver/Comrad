/**
 * @swagger
 *
 * /library/many:
 *   post:
 *     tags:
 *     - Library (Albums, Artists and Tracks)
 *     operationId: CreateManyLibrary
 *     summary: Create Many
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Create multiple Library records
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Music Library Admin`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Library'
 *         required: true
 *         description: "Library objects to be added"
 *     responses:
 *       200:
 *         description: The Library records were created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: Library
 *               example:
 *               - popularity: 0
 *                 _id: 5f5fdb69e546d851980aa75d
 *                 name: A New Artist
 *                 type: artist
 *                 created_at: '2020-09-14T21:06:49.598Z'
 *                 updated_at: '2020-09-14T21:06:49.599Z'
 *                 __v: 0
 *               - popularity: 0
 *                 _id: 5f5fdb69e546d851980aa75e
 *                 name: A New Album
 *                 type: album
 *                 artist: 5f5fd9ebfa3e4138f8d38ecd
 *                 label: Comrad Records
 *                 created_at: '2020-09-14T21:06:49.600Z'
 *                 updated_at: '2020-09-14T21:06:49.600Z'
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const db = require('../../models');
const {
  validateAlbumData,
  validateArtistData,
  validateTrackData,
} = require('./utils');

function createMany(req, res) {
  let libraryPromises = [];
  let hasError = false;
  req.body.forEach(function(entity) {
    if (typeof entity.name === 'undefined') {
      res.status(422).json({
        errorMessage: 'name is required',
      });
      hasError = true;
    }
    if (typeof entity.type === 'undefined') {
      res.status(422).json({
        errorMessage: 'type is required',
      });
      hasError = true;
    }

    switch (entity.type) {
      case 'album':
        libraryPromises.push(validateAlbumData(entity));
        break;
      case 'artist':
        libraryPromises.push(validateArtistData(entity));
        break;
      case 'track':
        libraryPromises.push(validateTrackData(entity));
        break;
      default:
        res.status(422).json({
          errorMessage: 'received an unexpected value for "type"',
        });
        hasError = true;
    }
  });
  if (hasError) {
    return;
  }

  Promise.all(libraryPromises)
    .then(values => {
      db.Library.insertMany(values)
        .then(dbLibrary => res.json(dbLibrary))
        .catch(err => res.json(422).json(err));
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
      return;
    });
}

module.exports = createMany;
