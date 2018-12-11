const db = require('../models');

/**
 * Splits a given query string into a regexp pattern string matching any word
 * in the source query.
 * @param {String} queryString
 * @returns {String}
 */
function splitQueryByWord(queryString) {
  return queryString
    .split(/\s+/)
    .map(word => `(${word})`)
    .join('|');
}

/**
 * Queries the Album, Artist, and Track collections, returning a combined array
 * of albums, artists, and tracks that match the query.
 * @param {RegExp} re
 * @returns {Array}
 */
async function findInLibrary(queryString) {
  const re = new RegExp(splitQueryByWord(queryString), 'i');

  const artistResults = await db.Artist.find({ name: re });
  const artistIDs = artistResults.map(artist => artist._id);

  const albumResults = await db.Album.find({
    $or: [{ name: re }, { artist: { $in: artistIDs } }],
  }).populate('artist');
  const albumIDs = albumResults.map(album => album._id);

  const trackResults = await db.Track.find({
    $or: [
      { name: re },
      { artists: { $in: artistIDs } },
      { album: { $in: albumIDs } },
    ],
  })
    .populate({
      path: 'album',
      populate: {
        path: 'artist',
      },
    })
    .populate('artists');

  return [...artistResults, ...albumResults, ...trackResults];
}

/**
 * Counts the number of times a regular expression matches an input string.
 * @param {String} str
 * @param {RegExp} re
 */
function countMatches(str, re) {
  const { source, flags } = re;
  const globalRE = flags.split('').includes('g')
    ? new RegExp(source, flags)
    : new RegExp(source, flags + 'g');
  return (str.match(globalRE) || []).length;
}

/**
 * Calculates the relevance of the search match and return a copy of the result
 * object with the relevance added.
 * @param {Object} result
 * @param {RegExp} re
 * @returns {Object}
 */
function addRelevance(result, queryString) {
  const exactRE = new RegExp(queryString, 'i');

  if (exactRE.test(result.name)) {
    return {
      ...result._doc,
      relevance: 100,
    };
  }

  const anyRE = new RegExp(splitQueryByWord(queryString), 'i');

  const albumName = result.album ? result.album.name : '';
  const albumArtist = result.album
    ? result.album.artist.name
    : result.artist
    ? result.artist.name
    : '';
  const artistNames = result.artists
    ? result.artists.map(artist => artist.name).join(', ')
    : '';

  return {
    ...result._doc,
    relevance:
      countMatches(result.name, anyRE) +
      countMatches(albumName, anyRE) +
      countMatches(albumArtist, anyRE) +
      countMatches(artistNames, anyRE),
  };
}

module.exports = {
  async searchLibrary(req, res) {
    const { searchTerm } = req.body;

    if (searchTerm === '') {
      return res.json([]);
    }

    const results = (await findInLibrary(searchTerm)).map(result =>
      addRelevance(result, searchTerm),
    );

    const data = [...results].sort((a, b) => {
      if (a.relevance > b.relevance) {
        return -1;
      }
      if (a.relevance < b.relevance) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    return res.json(data.slice(0, 30));
  },

  async searchUsers(req, res) {
    const { searchTerm } = req.body;
    const q = new RegExp(searchTerm, 'i');

    const userResults = await db.User.find({
      $or: [{ email: q }, { first_name: q }, { last_name: q }],
    });

    const data = [...userResults].sort((a, b) => {
      if (a.last_name < b.last_name) {
        return -1;
      }
      if (a.last_name > b.last_name) {
        return 1;
      }
      return 0;
    });

    return res.json(data);
  },
};
