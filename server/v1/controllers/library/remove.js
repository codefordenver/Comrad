/**
 * @swagger
 *
 * /library/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f5fdb69e546d851980aa75d
 *   delete:
 *     tags:
 *     - Library (Albums, Artists and Tracks)
 *     operationId: DeleteLibrary
 *     summary: Delete
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Delete a library item
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               description: "The record that was deleted"
 *               example:
 *                 popularity: 0
 *                 _id: 5f5fdb69e546d851980aa75d
 *                 name: A New Artist
 *                 type: artist
 *                 created_at: '2020-09-14T21:06:49.598Z'
 *                 updated_at: '2020-09-14T21:06:49.599Z'
 *                 __v: 0
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       404:
 *         description: Library item does not exist
 *       422:
 *         description: There was an issue with the data you provided. Check the response for more details.
 */

const db = require('../../models');

function remove(req, res) {
  return db.Library.findOne({ _id: req.params.id })
    .then(libraryData => {
      if (libraryData === null) {
        return res
          .status(404)
          .json({ errorMessage: 'Library item does not exist' });
      }
      switch (libraryData.type) {
        case 'album':
          return db.Library.findOne({ album: req.params.id })
            .then(trackReferencingAlbum => {
              if (trackReferencingAlbum != null) {
                throw 'This album cannot be deleted because it has tracks.';
              }

              return db.Library.findById({ _id: req.params.id })
                .then(dbAlbum => dbAlbum.remove())
                .then(dbAlbum => res.json(dbAlbum))
                .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json({ errorMessage: err }));
        case 'artist':
          return db.Library.findOne({ artist: req.params.id })
            .then(albumReferencingArtist => {
              if (albumReferencingArtist != null) {
                throw 'The artist cannot be deleted because it has albums.';
              }
              return db.Library.findOne({ artist: req.params.id })
                .then(trackReferencingArtist => {
                  if (trackReferencingArtist != null) {
                    throw 'The artist cannot be deleted because it has tracks.';
                  }
                  db.Library.findById({ _id: req.params.id })
                    .then(dbArtist => dbArtist.remove())
                    .then(dbArtist => res.json(dbArtist))
                    .catch(err => res.status(422).json({ errorMessage: err }));
                })
                .catch(err => res.status(422).json({ errorMessage: err }));
            })
            .catch(err => res.status(422).json({ errorMessage: err }));
        case 'track':
          return db.Playlist.findOne({ 'scratchpad.track': req.params.id })
            .then(trackReferencingPlaylist => {
              if (trackReferencingPlaylist != null) {
                throw 'This track cannot be deleted because it is being used in a playlist.';
              }

              return db.Playlist.findOne({
                'saved_items.track': req.params.id,
              })
                .then(trackReferencingPlaylist => {
                  if (trackReferencingPlaylist != null) {
                    throw 'This track cannot be deleted because it is being used in a playlist.';
                  }

                  return db.Library.findById({ _id: req.params.id })
                    .then(dbTrack => dbTrack.remove())
                    .then(dbTrack => res.json(dbTrack))
                    .catch(err => res.status(422).json({ errorMessage: err }));
                })
                .catch(err => res.status(422).json({ errorMessage: err }));
            })
            .catch(err => res.status(422).json({ errorMessage: err }));
        default:
          return res.status(422).json({
            errorMessage: 'library entity was not of a known type',
          });
      }
    })
    .catch(err => res.status(422).json({ errorMessage: err }));
}

module.exports = remove;
