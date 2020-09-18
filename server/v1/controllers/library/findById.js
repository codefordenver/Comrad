/**
 * @swagger
 *
 * /library/{id}:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     example: 5f35a3e7783e63454ccdd9d9
 *   get:
 *     tags:
 *     - Library (Albums, Artists and Tracks)
 *     operationId: GetByIdLibrary
 *     summary: Get by ID
 *     security:
 *     - ApiKeyAuth: []
 *     description: |
 *       Get an individual library item by ID
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 docs:
 *                 popularity: 77
 *                 _id: 5f35a3e7783e63454ccdd9d9
 *                 name: Janet Jackson & Michael Jackson
 *                 type: artist
 *                 created_at: '2020-08-13T20:34:47.650Z'
 *                 updated_at: '2020-08-13T20:34:47.650Z'
 *                 albums:
 *                 - popularity: 55
 *                   _id: 5f35a43a783e63454ccfa464
 *                   artists: []
 *                   name: Number Ones
 *                   artist: 5f35a3e7783e63454ccdd9d9
 *                   label:
 *                   genre:
 *                   compilation: false
 *                   created_at: '2012-10-18T06:07:25.000Z'
 *                   custom:
 *                     a_custom_property: a custom value
 *                   type: album
 *                   updated_at: '2020-08-13T20:36:10.758Z'
 *                   number_of_tracks: 1
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');

async function findById(req, res) {
  const dbLibrary = await db.Library.findById(req.params.id).populate([
    'artist',
    'artists',
    'album',
    'genre',
  ]);

  if (!dbLibrary) {
    res.status(422).json('Library object does not exist');
  }

  let data = {
    ...dbLibrary._doc,
  };

  // find additional data, depending on the entity type

  if (dbLibrary.type === 'album') {
    const dbTracks = await db.Library.find({ album: dbLibrary._id });
    data.tracks = dbTracks;
  } else if (dbLibrary.type === 'artist') {
    const dbAlbums = await db.Library.find(
      { artist: dbLibrary._id, type: 'album' },
      {},
      { sort: 'name' },
    );
    data.albums = await Promise.all(
      dbAlbums.map(async album => {
        const numberOfTracks = await db.Library.countDocuments({
          album: album._id,
          type: 'track',
        });
        let modifiedAlbum = {
          ...album._doc,
          number_of_tracks: numberOfTracks,
        };
        return modifiedAlbum;
      }),
    );
  }

  res.status(200).json(data);
}

module.exports = findById;
