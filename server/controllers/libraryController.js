const db = require('../models');
const keys = require('../config/keys');

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

module.exports = {
  /**
   * Queries all records in the music library: artists, albums, and tracks.
   * Returns paged results, with a limited number of records per page in order to
   * keep the Mongo query running quickly.
   *
   * GET Parameters:
   * sortBy (optional) - String, defaults to "updated_at". The field name to filter by.
   * sortDescending (optional) - Boolean, defaults to true. Whether to sort the records in a descending order
   * page (optional) - Number, defaults to 1. The page number of results to return. Making an API call to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
   * artistSkip (optional) - Number, defaults to 0. The number of artist records to skip in the Mongo query before grabbing records. Making an API call to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
   * albumSkip (optional) - Number, defaults to 0. The number of album records to skip in the Mongo query before grabbing records. Making an API call to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
   * trackSkip (optional) - Number, defaults to 0. The number of track records to skip in the Mongo query before grabbing records. Making an API call to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
   *
   * Returns:
   * An object with:
   * results - Array, the artist/album/track objects
   * totalPages - Number, the total number of pages in the result set
   * nextPage - Object, if there is another page of results
   * nextPage.page - Number, the page number for the next page
   * nextPage.url - String, the API URL to call for the results of the next page
   */
  async findAll(req, res) {
    let {
      sortBy,
      sortDescending,
      page,
      artistSkip,
      albumSkip,
      trackSkip,
    } = req.query;

    //set defaults for variables & cast variables to correct data type
    sortBy = sortBy || 'updated_at';
    sortDescending = sortDescending || true;
    page = page != null ? Number(page) : 0;
    artistSkip = artistSkip != null ? Number(artistSkip) : 0;
    albumSkip = albumSkip != null ? Number(albumSkip) : 0;
    trackSkip = trackSkip != null ? Number(trackSkip) : 0;

    let sortObj = {};
    sortObj[sortBy] = sortDescending ? -1 : 1;

    //query 100 items of each type from the mongo database
    const artistResults = await db.Artist.find({}, null, {
      sort: sortObj,
      skip: artistSkip,
      limit: keys.queryPageSize,
    });
    const albumResults = await db.Album.find({}, null, {
      sort: sortObj,
      skip: albumSkip,
      limit: keys.queryPageSize,
    }).populate('artist');
    const trackResults = await db.Track.find({}, null, {
      sort: sortObj,
      skip: trackSkip,
      limit: keys.queryPageSize,
    })
      .populate('artists')
      .populate('album');

    //transform the results from the database to the results for this page by
    //looping through the results and order the artist, albums and tracks,
    //determining how the artists/albums/tracks shold be ordered relative to each other,
    //then returning the results once we've hit the number of results that should be returned
    let results = [];
    let currentArtist = artistResults.length > 0 ? artistResults[0] : null;
    let currentAlbum = albumResults.length > 0 ? albumResults[0] : null;
    let currentTrack = trackResults.length > 0 ? trackResults[0] : null;
    let artistIndex = 0;
    let albumIndex = 0;
    let trackIndex = 0;
    let endOfResults = false;

    while (results.length < keys.queryPageSize && !endOfResults) {
      if (
        //check if the artist should be sorted before the album and track
        currentArtist != null &&
        (currentAlbum == null ||
          (currentArtist[sortBy] > currentAlbum[sortBy] && sortDescending) ||
          (currentArtist[sortBy] < currentAlbum[sortBy] && !sortDescending)) &&
        (currentTrack == null ||
          (currentArtist[sortBy] > currentTrack[sortBy] && sortDescending) ||
          (currentArtist[sortBy] < currentTrack[sortBy] && !sortDescending))
      ) {
        results.push(currentArtist);
        artistIndex++;
        if (artistIndex < artistResults.length) {
          currentArtist = artistResults[artistIndex];
        } else {
          currentArtist = null;
        }
      } else if (
        //check if the album should be sorted before the artist and track
        currentAlbum != null &&
        (currentArtist == null ||
          (currentAlbum[sortBy] > currentArtist[sortBy] && sortDescending) ||
          (currentAlbum[sortBy] < currentArtist[sortBy] && !sortDescending)) &&
        (currentTrack == null ||
          (currentAlbum[sortBy] > currentTrack[sortBy] && sortDescending) ||
          (currentAlbum[sortBy] < currentTrack[sortBy] && !sortDescending))
      ) {
        results.push(currentAlbum);
        albumIndex++;
        if (albumIndex < albumResults.length) {
          currentAlbum = albumResults[albumIndex];
        } else {
          currentAlbum = null;
        }
      } else if (currentTrack != null) {
        //the track should be next in the list based on sort order
        results.push(currentTrack);
        trackIndex++;
        if (trackIndex < trackResults.length) {
          currentTrack = trackResults[trackIndex];
        } else {
          currentTrack = null;
        }
      }
      if (
        currentArtist == null &&
        currentAlbum == null &&
        currentTrack == null
      ) {
        endOfResults = true;
      }
    }

    //estimate the total number of pages
    const artistDocs = await db.Artist.estimatedDocumentCount();
    const albumDocs = await db.Album.estimatedDocumentCount();
    const trackDocs = await db.Track.estimatedDocumentCount();
    const totalDocuments = artistDocs + albumDocs + trackDocs;
    const totalPages = Math.ceil(totalDocuments / keys.queryPageSize);

    let resultsJson = {
      results: results,
      totalPages: totalPages,
    };
    if (!endOfResults) {
      //generate a URL that will be used to display the next page of results
      page++;
      artistSkip += artistIndex;
      albumSkip += albumIndex;
      trackSkip += trackIndex;
      resultsJson.nextPage = {
        page: page,
        url:
          '/api/library?page=' +
          page +
          '&artistSkip=' +
          artistSkip +
          '&albumSkip=' +
          albumSkip +
          '&trackSkip=' +
          trackSkip +
          '&sortBy=' +
          sortBy +
          '&sortDescending=' +
          (sortDescending ? '1' : '0'),
      };
    }

    return res.json(resultsJson);
  },

  /**
   * Searches artists, albums, and/or tracks based on a search term
   *
   * GET Parameters:
   * s (required) - String, the search string to query by
   * type (optional) - String, defaults to "all". One of "all", "album", "artist" or "track" depending on what database objects should be searched
   *
   * Returns:
   * An object with:
   * results - Array, the artist/album/track objects
   * totalPages - Number, the total number of pages in the result set (At the moment, this is always 1 since we aren't returning more than one page of search results.)
   */
  async searchLibrary(req, res) {
    let { s, type = 'all' } = req.query;

    if (s === '') {
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
  },
};
