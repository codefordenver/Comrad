/**
 * @swagger
 *
 * /library/search:
 *   get:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: SearchLibrary
 *     summary: Search
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - name: s
 *       required: true
 *       in: query
 *       type: string
 *       description: The string to search for
 *     - name: type
 *       required: false
 *       in: query
 *       schema:
 *         type: string
 *         enum: [artist,album,track]
 *       description: If provided, this endpoint will only return the specified entity type
 *     - name: limit
 *       required: false
 *       in: query
 *       type: integer
 *       description: The number of results to return. Defaults to 100.
 *     description: |
 *       Search for library items based on a search string. Results will be ordered with the most relevant result first.
 *
 *       This endpoint returns a `totalPages` value, but that value will always be 1. The `totalPages` value is only included for compatibility with some components within Comrad.
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 docs:
 *                 - popularity: 80
 *                   _id: 5f35a3e7783e63454ccdd9d9
 *                   artists: []
 *                   name: Janet Jackson & Michael Jackson
 *                   type: artist
 *                   updated_at: '2020-08-13T20:34:47.650Z'
 *                   score: 1.125
 *                   relevance: 3.375
 *                 - popularity: 0
 *                   _id: 5f35a4e8783e63454cd2cec9
 *                   artists:
 *                   - popularity: 61
 *                     _id: 5f35a3e5783e63454ccd79be
 *                     name: Johnny Cash
 *                     type: artist
 *                     created_at: '2020-08-13T20:34:45.558Z'
 *                     updated_at: '2020-08-13T20:34:45.558Z'
 *                   name: JACKSON
 *                   album:
 *                     popularity: 75
 *                     _id: 5f35a425783e63454ccf2ce7
 *                     name: The Legend of Johnny Cash
 *                     artist: 5f35a3e5783e63454ccd79be
 *                     label: Legacy
 *                     genre: 5f35a41e783e63454ccee90f
 *                     compilation: false
 *                     type: album
 *                     created_at: '2020-08-13T20:35:49.013Z'
 *                     updated_at: '2020-08-13T20:35:49.013Z'
 *                   type: track
 *                   updated_at: '2020-08-13T20:39:04.848Z'
 *                   score: 1.1
 *                   relevance: 2.2
 *                 - popularity: 54
 *                   _id: 5f35a4b5783e63454cd1b72c
 *                   artists:
 *                   - popularity: 52
 *                     _id: 5f35a3e5783e63454ccd75bb
 *                     artists: []
 *                     name: Lucinda Williams
 *                     type: artist
 *                     created_at: '2020-08-13T20:34:45.259Z'
 *                     updated_at: '2020-08-13T20:34:45.259Z'
 *                   name: Jackson
 *                   album:
 *                     popularity: 38
 *                     _id: 5f35a41f783e63454ccef3b9
 *                     artists: []
 *                     name: Car Wheels on a Gravel Road
 *                     artist: 5f35a3e5783e63454ccd75bb
 *                     label: Mercury Records
 *                     genre: 5f35a41e783e63454ccee908
 *                     compilation: false
 *                     type: album
 *                     created_at: '2020-08-13T20:35:43.158Z'
 *                     updated_at: '2020-08-13T20:35:43.158Z'
 *                   type: track
 *                   updated_at: '2020-08-13T20:38:13.160Z'
 *                   score: 1.1
 *                   relevance: 2.2
 *                 totalPages: 1
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const keys = require('../../config/keys');

async function search(req, res) {
  let { s, type, limit } = req.query;

  if (!s) {
    return res.json([]);
  }

  if (limit != null) {
    limit = Number(limit);
    if (limit > keys.queryPageSize) {
      return res.status(422).json({
        errorMessage: 'limit cannot exceed ' + keys.queryPageSize,
      });
    }
  } else {
    limit = keys.queryPageSize;
  }

  let filterObj = { $text: { $search: s } };

  let validTypes = ['album', 'artist', 'track'];
  if (type != null && validTypes.indexOf(type) !== -1) {
    filterObj.type = type;
  }

  const libraryResults = await db.Library.find(
    filterObj,
    {
      name: 1,
      artists: 1,
      artist: 1,
      album: 1,
      popularity: 1,
      type: 1,
      updated_at: 1,
      score: { $meta: 'textScore' },
    },
    {
      sort: { score: { $meta: 'textScore' } },
      limit: limit,
    },
  ).populate(['artist', 'artists', 'album']);

  const results = libraryResults.map(result => {
    // in these relevance calculations, popularity of the entity has a slight effect,
    // but, how much the name matches the search query has a much larger effect
    // for artists, the artist's name only is considered
    // for albums, the name of the artist and the name of the album is considered
    // for tracks, the name of the track, the name of the album, and the name of all associated artists are considered

    // if making changes to this process,
    // here are some queries to test: (and please add any queries you come across that are causing issues that require changes)
    // michael jackson --- 1st result should be the artist Michael Jackson
    // michael jackson thriller in concert --- 1st result should be the track Thriller off of Michael Jackson's album In Concert
    // stevie songs in the key of life --- 1st result should be the album Songs in the Key of Life by Stevie Wonder
    // yesterday --- 1st result should be Yesterday by The Beatles
    switch (result.type) {
      case 'artist':
        return {
          ...result._doc,
          relevance: result._doc.score * 3 + result._doc.popularity / 300,
        };
      case 'album':
        //find artist's text match score
        let artistTextMatchScore = 0;
        let artist = libraryResults.filter(function(r) {
          return String(r._id) === String(result.artist) && r.type === 'artist';
        });
        if (artist.length > 0) {
          artistTextMatchScore += artist[0]._doc.score;
        }
        return {
          ...result._doc,
          artistTextMatchScore: artistTextMatchScore,
          relevance:
            result._doc.score * 1.5 +
            artistTextMatchScore * 1.5 +
            result._doc.popularity / 300,
        };
      case 'track':
        let albumTextMatchScore = 0;
        let album = libraryResults.filter(function(r) {
          return String(r._id) === String(result.album) && r.type === 'album';
        });
        if (album.length > 0) {
          albumTextMatchScore += album[0]._doc.score;
        }
        let artistsTextMatchScore = 0;
        let artists = libraryResults.filter(function(r) {
          if (typeof result.artists === 'undefined') {
            return false;
          }
          return result.artists.indexOf(r._id) !== -1 && r.type === 'artist';
        });
        artists.forEach(function(a) {
          artistsTextMatchScore += a._doc.score;
        });
        return {
          ...result._doc,
          relevance:
            result._doc.score * 2 +
            albumTextMatchScore +
            artistsTextMatchScore +
            result._doc.popularity / 300,
        };
      default:
        //this condition should not be called, but is here to eliminate the eslint warning
        return {
          ...result._doc,
        };
    }
  });

  const data = [...results].sort((a, b) => {
    if (a.relevance > b.relevance) {
      return -1;
    }
    if (a.relevance < b.relevance) {
      return 1;
    }
    if (a.popularity < b.popularity) {
      return -1;
    }
    if (a.popularity < b.popularity) {
      return -1;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return res.json({
    docs: data,
    totalPages: 1,
  });
}

module.exports = search;
