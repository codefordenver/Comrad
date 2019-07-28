const db = require('../../../models');
const {
  utils: { allShowInstancesInDateRange },
  utils__mongoose: { master_time_id__byShowType },
} = require('../../shows/utils');

async function populatePlaylist(docPlaylist) {
  docPlaylist = await db.Playlist.populate(docPlaylist, [
    {
      path: 'scratchpad.track',
      populate: 'artists',
    },
    {
      path: 'saved_items.track',
      populate: 'artists',
    },
    'saved_items.traffic',
  ]);

  let objPlaylist = docPlaylist.toObject();
  for (var i = 0; i < docPlaylist.saved_items.length; i++) {
    let docSavedItems = docPlaylist.saved_items[i];
    if (typeof docSavedItems.traffic !== 'undefined') {
      let instances = allShowInstancesInDateRange(
        docSavedItems.traffic,
        docPlaylist.start_time_utc,
        docPlaylist.end_time_utc,
      );
      if (instances.length > 1) {
        console.error(
          'More than one instance of a traffic series within a playlist: ' +
            docPlaylist._id,
        );
      }
      objPlaylist.saved_items[i].traffic = instances[0];
    }
  }

  return objPlaylist;
}

module.exports = populatePlaylist;
