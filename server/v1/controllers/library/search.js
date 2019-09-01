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
