const db = require('../../models');
const keys = require('../../config/keys');

/**
 * Queries all records in the music library: artists, albums, and tracks.
 * Returns paged results, with a limited number of records per page in order to
 * keep the Mongo query running quickly.
 *
 * GET Parameters:
 * type (optional) -
 *  String, either "artist", "album" or "track" to filter by entity type
 * sortBy (optional) -
 *  String, defaults to "updated_at". The field name to filter by.
 *
 * sortDescending (optional) -
 *  Boolean, defaults to true. Whether to sort the records in a descending order
 *
 * page (optional) -
 *  Number, defaults to 1. The page number of results to return. Making an API call  to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
 *
 *
 * Returns:
 * An object with:
 * results - Array, the artist/album/track objects
 * totalPages - Number, the total number of pages in the result set
 * nextPage - Object, if there is another page of results
 * nextPage.page - Number, the page number for the next page
 * nextPage.url - String, the API URL to call for the results of the next page
 */

async function findAll(req, res) {
  let { sortBy, sortDescending, type, page } = req.query;

  //set defaults for variables & cast variables to correct data type
  sortBy = sortBy || 'updated_at';
  sortDescending = sortDescending || true;
  page = page != null ? Number(page) : 0;

  let sortObj = {};
  sortObj[sortBy] = sortDescending ? -1 : 1;

  let filterObj = {};
  if (type != null) {
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
    results: libraryResults,
    totalPages: totalPages,
  };
  if (page + 1 >= totalPages) {
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
