const db = require('../models');

/**
 * Flattens an array of arrays into one flat array.
 * @example
 * // returns [1, 2, 3, 4, 5, 6]
 * concatArrays([[1, 2], [3, 4], [5, 6]]);
 */
function concatArrays(arrays) {
  return arrays.reduce((acc, val) => [...acc, ...val]);
}

/**
 * Removes duplicate objects from a results array.
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
 * Queries the Album, Artist, and Track collections for a given query string
 * and populates the relationships in Track.
 */
async function findInLibrary(query) {
  const queryRegexp = new RegExp(query, 'i');
  const resultSets = await Promise.all([
    db.Album.find({ name: queryRegexp }),
    db.Artist.find({ name: queryRegexp }),
    db.Track.find({ name: queryRegexp })
      .populate('album')
      .populate('artists'),
  ]);

  const results = concatArrays(resultSets);

  return results;
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
