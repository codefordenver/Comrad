const db = require('../../../models');
const { errorHandlers } = require('../../../utils');

async function updateSearchIndex(libraryDoc) {
  return libraryDoc
    .getSearchIndexForLibrary()
    .then(searchIndex => {
      console.log(
        'updating library search index for ' +
          libraryDoc._id +
          ' to: ' +
          searchIndex,
      );
      libraryDoc.search_index = searchIndex;
      return libraryDoc
        .save()
        .then(libraryDoc => {
          switch (libraryDoc.type) {
            case 'artist':
              //if this is an artist, update the artist's albums and tracks
              return Promise.all([
                db.Library.find({ type: 'album', artist: libraryDoc._id })
                  .then(albums => {
                    return Promise.all(
                      albums.map(album =>
                        updateSearchIndex(album).catch(
                          errorHandlers.throwError,
                        ),
                      ),
                    ).catch(errorHandlers.throwError);
                  })
                  .catch(errorHandlers.throwError),
                db.Library.find({ type: 'track', artists: libraryDoc._id })
                  .then(tracks => {
                    return Promise.all(
                      tracks.map(track =>
                        updateSearchIndex(track).catch(
                          errorHandlers.throwError,
                        ),
                      ),
                    ).catch(errorHandlers.throwError);
                  })
                  .catch(errorHandlers.throwError),
              ])
                .then(() => libraryDoc)
                .catch(errorHandlers.throwError);

              break;
            case 'album':
              //if this is an album, update the album's tracks
              return db.Library.find({ type: 'track', album: libraryDoc._id })
                .then(tracks => {
                  return Promise.all(
                    tracks.map(track =>
                      updateSearchIndex(track).catch(errorHandlers.throwError),
                    ),
                  ).then(() => libraryDoc);
                })
                .catch(errorHandlers.throwError);
              break;
            default:
              return libraryDoc;
          }
        })
        .catch(errorHandlers.throwError);
    })
    .catch(errorHandlers.throwError);
}
module.exports = updateSearchIndex;
