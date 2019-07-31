const db = require('../../../models');
const populateTrafficInstance = require('./populateTrafficInstance');

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
      objPlaylist.saved_items[i].traffic = populateTrafficInstance(
        docSavedItems.traffic,
        docSavedItems.master_time_id,
        docPlaylist.start_time_utc,
        docPlaylist.end_time_utc,
      );
    }
  }

  return objPlaylist;
}

module.exports = populatePlaylist;
