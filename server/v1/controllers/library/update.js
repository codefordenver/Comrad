/**
 * @swagger
 *
 * /library/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f35a3e7783e63454ccdd9d9
 *   put:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: UpdateLibrary
 *     summary: Update
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Update a library item
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Music Library Admin`
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "label": "Comrad Records"
 *       required: true
 *       description: "JSON object of properties to update"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               description: "The new, updated record"
 *               example:
 *                 popularity: 0
 *                 _id: 5f35a425783e63454ccf2ce7
 *                 name: The Legend of Johnny Cash
 *                 artist: 5f35a3e5783e63454ccd79be
 *                 label: Comrad Records
 *                 genre:
 *                   _id: 5f35a41e783e63454ccee90f
 *                   name: Country
 *                   created_at: '2020-08-13T20:35:42.430Z'
 *                   updated_at: '2020-08-13T20:35:42.430Z'
 *                   __v: 0
 *                 compilation: false
 *                 custom:
 *                   a_custom_property: "a custom value"
 *                 type: album
 *                 created_at: '2020-08-13T20:35:49.013Z'
 *                 updated_at: '2020-08-13T20:35:49.013Z'
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const db = require('../../models');
const {
  updateSearchIndex,
  validateAlbumData,
  validateArtistData,
  validateTrackData,
} = require('./utils');

function update(req, res) {
  db.Library.findOne({ _id: req.params.id })
    .then(libraryData => {
      const { artist, name } = libraryData;

      switch (libraryData.type) {
        case 'album':
          return validateAlbumData({ artist, name, ...req.body }, req.params.id)
            .then(albumData =>
              db.Library.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
              }).populate('genre'),
            )
            .then(dbAlbum => updateSearchIndex(dbAlbum))
            .then(dbAlbum => res.json(dbAlbum))
            .catch(err => res.status(422).json(err));
        case 'artist':
          return validateArtistData(req.body, req.params.id)
            .then(updateTo => {
              updateTo.updated_at = Date.now();
              return db.Library.findOneAndUpdate(
                { _id: req.params.id },
                updateTo,
                {
                  new: true,
                },
              )
                .then(dbArtist => updateSearchIndex(dbArtist))
                .then(dbArtist => res.json(dbArtist))
                .catch(err => res.status(422).json(err));
            })
            .catch(err => {
              console.error(err);
              res.status(422).json({
                errorMessage: err,
              });
              return;
            });
        case 'track':
          return validateTrackData(req.body)
            .then(() =>
              db.Library.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
              })
                .populate('artists')
                .populate('album'),
            )
            .then(dbTrack => updateSearchIndex(dbTrack))
            .then(dbTrack => res.json(dbTrack))
            .catch(err => res.status(422).json({ errorMessage: err }));
        default:
          return res.status(422).json({
            errorMessage: 'library entity was not of a known type',
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(422).json({
        errorMessage: err,
      });
    });
}

module.exports = update;
