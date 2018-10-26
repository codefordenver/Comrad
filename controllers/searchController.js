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

module.exports = {
  search: async (req, res) => {
    const { searchTerm } = req.body;

    if (searchTerm === '') {
      return res.json([]);
    }

    const queryAll = new RegExp(searchTerm, 'i');

    const resultSetsAll = await Promise.all([
      db.Album.find({ name: queryAll }),
      db.Artist.find({ name: queryAll }),
      db.Track.find({ name: queryAll }),
    ]);

    const resultsAll = concatArrays(resultSetsAll);

    if (/\s/.test(searchTerm)) {
      const queryAny = new RegExp(
        searchTerm
          .split(/\s/)
          .map(term => `(${term})`)
          .join('|'),
        'i'
      );

      const resultSetsAny = await Promise.all([
        db.Album.find({ name: queryAny }),
        db.Artist.find({ name: queryAny }),
        db.Track.find({ name: queryAny }),
      ]);

      const resultsAny = concatArrays(resultSetsAny);

      results = [...resultsAll, ...resultsAny];
    } else {
      results = [...resultsAll];
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
