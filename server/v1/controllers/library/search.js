const keys = require('../../config/keys');
const { findInLibrary } = require('./utils');

async function search(req, res) {
  let { s, type = 'all' } = req.query;

  if (!s) {
    return res.json([]);
  }

  const allResults = await findInLibrary(s, type);
  const allAlbums = allResults.filter(function(ar) {
    return ar.type === 'album';
  });
  const allArtists = allResults.filter(function(ar) {
    return ar.type === 'artist';
  });
  const allTracks = allResults.filter(function(ar) {
    return ar.type === 'track';
  });
  let resultsToReturn = allResults;
  switch (type) {
    case 'artist':
      resultsToReturn = allArtists;
      break;
    case 'album':
      resultsToReturn = allAlbums;
      break;
    case 'track':
      resultsToReturn = allTracks;
      break;
    default:
  }
  const results = resultsToReturn.map(result => {
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
          return result.artists.indexOf(r._id) !== -1;
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
    results: data.slice(0, keys.queryPageSize),
    totalPages: 1,
  });
}

module.exports = search;
