const db = require('../models');

/**
 * Queries the Album, Artist, and Track collections, returning a combined array
 * of albums, artists, and tracks that match the query.
 * @param {RegExp} re
 * @returns {Array}
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
      score: { $meta: 'textScore' },
    },
    {
      sort: { score: { $meta: 'textScore' } },
      limit: 100,
    },
  );

  const trackResults = await db.Track.find(
    { $text: { $search: queryString } },
    {
      name: 1,
      popularity: 1,
      artists: 1,
      album: 1,
      type: 1,
      score: { $meta: 'textScore' },
    },
    {
      sort: { score: { $meta: 'textScore' } },
      limit: 100,
    },
  );

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

module.exports = {
  async searchLibrary(req, res) {
    const { s } = req.query;

    if (s === '') {
      return res.json([]);
    }

    const allResults = await findInLibrary(s);
    const allAlbums = allResults.filter(function(ar) {
      return ar.type == 'album';
    });
    const allArtists = allResults.filter(function(ar) {
      return ar.type == 'artist';
    });
    const results = allResults.map(result => {
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
          let artist = allArtists.filter(function(r) {
            return String(r._id) === String(result.artist);
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
          let album = allAlbums.filter(function(r) {
            return String(r._id) === String(result.album);
          });
          if (album.length > 0) {
            albumTextMatchScore += album[0]._doc.score;
          }
          let artistsTextMatchScore = 0;
          let artists = allResults.filter(function(r) {
            return result.artists.indexOf(r._id) != -1;
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
