/**
 * @swagger
 *
 * /library:
 *   get:
 *     tags:
 *     - Library (Albums, Artists, Tracks)
 *     operationId: FindAllLibrary
 *     summary: Find All
 *     security:
 *     - ApiKeyAuth: []
 *     parameters:
 *     - type:
 *       required: false
 *       in: query
 *       schema:
 *         type: string
 *         enum: [artist,album,track]
 *       description: If provided, this endpoint will only return the specified entity type
 *     - sortBy:
 *       required: false
 *       in: query
 *       type: string
 *       description: If provided, the results will be sorted by this field name. Defaults to `updated_at`
 *     - sortDescending:
 *       required: false
 *       in: query
 *       type: boolean
 *       description: Whether to sort the results in a descending manner. Defaults to `true`
 *     - page:
 *       required: false
 *       in: query
 *       type: integer
 *       description: The page number of results to return. Defaults to 1.
 *     description: |
 *       Finds all items from the library. By default, this returns tracks, artists and albums together but the endpoint can be filtered to only return a particular type (artists, albums, tracks).
 *
 *       Results are paged. The `page` parameter can be used different pages in the result set. The API result will also include a `nextPage` object if there is another page of results. The `nextPage` object will consist of a `page` value (the numerical value of the next page) and a `url` value (the URL of the API call to access the next page)
 *
 *       The following roles can access this API endpoint: `Admin`, `Full Access`, `Show Captain`, `Underwriting`, `DJ`, `Music Library Admin`
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               example:
 *                 docs:
 *                 - popularity: 7
 *                   artists:
 *                   - popularity: 10
 *                     _id: 5f35a3e7783e63454ccde9db
 *                     name: Sabicas
 *                     type: artist
 *                     created_at: '2020-08-13T20:34:47.886Z'
 *                     updated_at: '2020-08-13T20:34:47.886Z'
 *                   _id: 5f35a645783e63454cd916b1
 *                   name: Fantasia Inca
 *                   album:
 *                     popularity: 2
 *                     _id: 5f35a495783e63454cd19670
 *                     name: Flamenco On Fire
 *                     artist: 5f35a3e7783e63454ccde9db
 *                     label: Sample Label
 *                     genre: 4a44a3e7783e63454ccdc897
 *                     compilation: false
 *                     created_at: '2020-05-05T15:20:28.000Z'
 *                     custom:
 *                       sample_custom_property: '1475159102'
 *                       another_custom_property: A custom value
 *                     type: album
 *                     updated_at: '2020-08-13T20:37:41.468Z'
 *                   track_number: 4
 *                   disk_number: 1
 *                   duration_in_seconds: 237
 *                   custom:
 *                     sample_custom_property_for_track: '591391'
 *                   type: track
 *                   created_at: '2020-08-13T20:44:53.977Z'
 *                   updated_at: '2020-08-13T20:44:53.977Z'
 *                 - popularity: 24
 *                   _id: 5f35a645783e63454cd9108d
 *                   name: 'Blind Willie Johnson '
 *                   type: artist
 *                   created_at: '2020-08-13T20:44:53.733Z'
 *                   updated_at: '2020-08-13T20:44:53.733Z'
 *                   __v: 0
 *                 - popularity: 2
 *                   _id: 5f35a495783e63454cd19666
 *                   name: Whoops, We Did It (Live) - EP
 *                   artist:
 *                     popularity: 4
 *                     _id: 5f35a3ea783e63454cce7ddd
 *                     name: Dandu
 *                     type: artist
 *                     created_at: '2020-08-13T20:34:50.188Z'
 *                     updated_at: '2020-08-13T20:34:50.188Z'
 *                   label: Sample Label Value
 *                   genre: 5f35a41e783e63454ccee914
 *                   compilation: false
 *                   created_at: '2020-05-04T18:01:57.000Z'
 *                   custom:
 *                     sample_custom_property: '1475159102'
 *                     another_custom_property: A custom value
 *                   type: album
 *                   updated_at: '2020-08-13T20:37:41.468Z'
 *                 totalPages: 7623
 *                 nextPage:
 *                   page: 1
 *                   url: "/v1/library?page=1&sortBy=updated_at&sortDescending=1"
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       403:
 *         description: Your API key or account does not have permission to access this
 *       500:
 *         description: Server error. Check the response for more details.
 */

const db = require('../../models');
const keys = require('../../config/keys');

async function findAll(req, res) {
  let { sortBy, sortDescending, type, page } = req.query;

  //set defaults for variables & cast variables to correct data type
  sortBy = sortBy || 'updated_at';
  sortDescending = sortDescending || 'true';
  page = page != null ? Number(page) : 0;

  let sortObj = {};
  sortObj[sortBy] = sortDescending === 'true' ? -1 : 1;

  let filterObj = {};
  let validTypes = ['album', 'artist', 'track'];
  if (type != null && validTypes.indexOf(type) !== -1) {
    filterObj.type = type;
  }

  const libraryResults = await db.Library.find(filterObj, null, {
    sort: sortObj,
    skip: page * keys.queryPageSize,
    limit: keys.queryPageSize,
  }).populate(['artist', 'artists', 'album']);

  //estimate the total number of pages
  const libraryDocs = await db.Library.countDocuments(filterObj);
  const totalPages = Math.ceil(libraryDocs / keys.queryPageSize);

  let resultsJson = {
    docs: libraryResults,
    totalPages: totalPages,
  };
  if (page + 1 <= totalPages) {
    //generate a URL that will be used to display the next page of results
    page++;
    resultsJson.nextPage = {
      page: page,
      url:
        '/v1/library?page=' +
        page +
        '&sortBy=' +
        sortBy +
        '&sortDescending=' +
        (sortDescending ? '1' : '0'),
    };
  }

  return res.json(resultsJson);
}

module.exports = findAll;
