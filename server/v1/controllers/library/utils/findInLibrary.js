const db = require('../../../models');

/**
 * Queries the Album, Artist, and Track collections, returning a combined array
 * of albums, artists, and tracks that match the query. Only searches
 * for the most relevant 100 results in each of the Album, Artist and Track collections.
 * @param {String} queryString
 * @returns {Array} an array of artists, albums and tracks found in the database
 */
async function findInLibrary(queryString) {
  //limit each query to 100 so that queries of many words are only limited to the most relevant results
  //a sample query that causes issues: stevie songs in the key of life

  const artistResults = await db.Artist.find(
    { $text: { $search: queryString } },
    {
      name: 1,
      popularity: 1,
      type: 1,
      updated_at: 1,
      score: { $meta: 'textScore' },
    },
    {
      sort: { score: { $meta: 'textScore' } },
      limit: 100,
    },
  );

  const albumResults = await db.Album.find(
    { $text: { $search: queryString } },
    {
      name: 1,
      popularity: 1,
      artist: 1,
      type: 1,
      updated_at: 1,
      score: { $meta: 'textScore' },
    },
    {
      sort: { score: { $meta: 'textScore' } },
      limit: 100,
    },
  ).populate('artist');

  const trackResults = await db.Track.find(
    { $text: { $search: queryString } },
    {
      name: 1,
      popularity: 1,
      artists: 1,
      album: 1,
      type: 1,
      updated_at: 1,
      score: { $meta: 'textScore' },
    },
    {
      sort: { score: { $meta: 'textScore' } },
      limit: 100,
    },
  )
    .populate('album')
    .populate('artists');

  return [...artistResults, ...albumResults, ...trackResults];
}

module.exports = findInLibrary;
