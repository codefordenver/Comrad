const db = require('../../models');
const keys = require('../../../../config/keys');

/**
 * Queries all records in the music library: artists, albums, and tracks.
 * Returns paged results, with a limited number of records per page in order to
 * keep the Mongo query running quickly.
 *
 * GET Parameters:
 * sortBy (optional) -
 *  String, defaults to "updated_at". The field name to filter by.
 *
 * sortDescending (optional) -
 *  Boolean, defaults to true. Whether to sort the records in a descending order
 *
 * page (optional) -
 *  Number, defaults to 1. The page number of results to return. Making an API call  to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
 *
 * artistSkip (optional) -
 *  Number, defaults to 0. The number of artist records to skip in the Mongo query before grabbing records. Making an API call to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
 *
 * albumSkip (optional) -
 *  Number, defaults to 0. The number of album records to skip in the Mongo query before grabbing records. Making an API call to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
 *
 * trackSkip (optional) -
 *  Number, defaults to 0. The number of track records to skip in the Mongo query before grabbing records. Making an API call to the first page of results (without providing page, artistSkip, albumSkip, or trackSkip) will return a property that will be the URL to use for the next page (with page, artistSkip, albumSkip and trackSkip automatically set)
 *
 * Returns:
 * An object with:
 * results - Array, the artist/album/track objects
 * totalPages - Number, the total number of pages in the result set
 * nextPage - Object, if there is another page of results
 * nextPage.page - Number, the page number for the next page
 * nextPage.url - String, the API URL to call for the results of the next page
 */

async function findAll(req, res) {
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
    if (currentArtist == null && currentAlbum == null && currentTrack == null) {
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
        '/v1/library?page=' +
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
}

module.exports = findAll;
