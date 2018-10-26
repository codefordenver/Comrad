const db = require('../models');

/**
 * Remove duplicate objects from a results array.
 * Objects are considered duplicates if their _id and type members are equal.
 */
function filterDuplicates(results) {
  return results.reduce(
    (acc, result) => {
      const key = result.type + result._id;
      if (acc.seen.has(key)) {
        return acc;
      }
      acc.seen.add(key);
      acc.filteredResults.push(result);
      return acc;
    },
    {
      seen: new Set(),
      filteredResults: [],
    }
  ).filteredResults;
}

/**
 * Query the Album, Artist, and Track collections for a given query string
 * and populate the relationships in Track.
 */
async function findInLibrary(query) {
  const queryRegexp = new RegExp(query, 'i');

  const artistResults = await db.Artist.find({ name: queryRegexp });
  const artistIDs = artistResults.map(result => result._id);

  const albumResults = await db.Album.find({
    $or: [{ name: queryRegexp }, { artists: { $in: artistIDs } }],
  });
  const albumIDs = albumResults.map(result => result._id);

  const trackResults = db.Track.find({
    $or: [
      { name: queryRegexp },
      { album: { $in: albumIDs } },
      { artists: { $in: artistIDs } },
    ],
  })
    .populate('album')
    .populate('album.artist')
    .populate('artists');

  return [...artistResults, ...albumResults, ...trackResults];
}

module.exports = {
  searchLibrary: async (req, res) => {
    const { searchTerm } = req.body;

    if (searchTerm === '') {
      return res.json([]);
    }

    const resultsAll = await findInLibrary(searchTerm);

    let results;

    if (/\s/.test(searchTerm)) {
      // Construct a regex that searches each whitespace separated term
      // separately.
      const queryAny = searchTerm
        .split(/\s/)
        .map(term => `(${term})`)
        .join('|');

      const resultsAny = await findInLibrary(queryAny);

      results = [...resultsAll, ...resultsAny];
    } else {
      results = resultsAll;
    }

    const data = filterDuplicates(
      results.sort((a, b) => {
        // Sort the results that match the whole string first, then alphabetically
        // based on the fields we searched by.
        if (a.matchType === 'all') return -1;
        if (a.matchType === 'any') return 1;
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    );

    return res.json(data);
  },

  searchUsers: async (req, res) => {
    const { searchTerm } = req.body;
    const q = new RegExp(searchTerm, 'i');

    const userResults = await db.User.find({
      $or: [{ email: q }, { first_name: q }, { last_name: q }],
    });

    const data = [...userResults].sort((a, b) => {
      if (a.last_name < b.last_name) return -1;
      if (a.last_name > b.last_name) return 1;
      return 0;
    });

    return res.json(data);
  },
};
