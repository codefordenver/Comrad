const db = require('../../../models');
const populateTrafficInstance = require('./populateTrafficInstance');

async function populatePlaylist(docPlaylist) {
  docPlaylist = await db.Playlist.populate(docPlaylist, [
    {
      path: 'scratchpad.track',
      populate: { path: 'artists' },
    },
    {
      path: 'scratchpad.track',
      populate: { path: 'album' },
    },
    {
      path: 'saved_items.track',
      populate: { path: 'artists album' },
    },
    {
      path: 'saved_items.traffic',
    },
  ]);

  let objPlaylist = docPlaylist.toObject();
  for (var i = 0; i < docPlaylist.saved_items.length; i++) {
    console.log(i);
    let docSavedItems = docPlaylist.saved_items[i];
    if (typeof docSavedItems.traffic !== 'undefined') {
      console.log('traffic');
      objPlaylist.saved_items[i].traffic = populateTrafficInstance(
        docSavedItems.traffic,
        docSavedItems.master_time_id,
        docPlaylist.start_time_utc,
        docPlaylist.end_time_utc,
      );
      console.log(objPlaylist.saved_items[i].traffic);
    }
  }

  return objPlaylist;
}

module.exports = populatePlaylist;
