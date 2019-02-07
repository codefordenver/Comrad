const db = require('../models');
const keys = require('../config/keys');

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
  async findAll(req, res) {
    let { page, artistSkip, albumSkip, trackSkip } = req.query; //TODO: are these the right conventions?

    if (artistSkip == null) {
      artistSkip = 0;
    } else {
      artistSkip = Number(artistSkip);
    }
    if (albumSkip == null) {
      albumSkip = 0;
    } else {
      albumSkip = Number(albumSkip);
    }
    if (trackSkip == null) {
      trackSkip = 0;
    } else {
      trackSkip = Number(trackSkip);
    }
    if (page == null) {
      page = 1;
    } else {
      page = Number(page);
    }

    const artistResults = await db.Artist.find({}, null, {
      sort: { updated_at: -1 },
      skip: artistSkip,
      limit: keys.queryPageSize,
    });
    const albumResults = await db.Album.find({}, null, {
      sort: { updated_at: -1 },
      skip: albumSkip,
      limit: keys.queryPageSize,
    });
    const trackResults = await db.Track.find({}, null, {
      sort: { updated_at: -1 },
      skip: trackSkip,
      limit: keys.queryPageSize,
    });

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
        currentArtist != null &&
        (currentAlbum == null ||
          currentArtist.updated_at > currentAlbum.updated_at) &&
        (currentTrack == null ||
          currentArtist.updated_at > currentTrack.updated_at)
      ) {
        results.push(currentArtist);
        artistIndex++;
        if (artistIndex < artistResults.length) {
          currentArtist = artistResults[artistIndex];
        } else {
          currentArtist = null;
        }
      } else if (
        currentAlbum != null &&
        (currentArtist == null ||
          currentAlbum.updated_at > currentArtist.updated_at) &&
        (currentTrack == null ||
          currentAlbum.updated_at > currentTrack.updated_at)
      ) {
        results.push(currentAlbum);
        albumIndex++;
        if (albumIndex < albumResults.length) {
          currentAlbum = albumResults[albumIndex];
        } else {
          currentAlbum = null;
        }
      } else if (currentTrack != null) {
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
          trackSkip,
      };
    }

    return res.json(resultsJson);
  },
};
