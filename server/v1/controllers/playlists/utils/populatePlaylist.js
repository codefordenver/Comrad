const db = require('../../../models');
const populateTrafficInstance = require('./populateTrafficInstance');

async function populatePlaylist(docPlaylist) {
  docPlaylist = await db.Playlist.populate(docPlaylist, [
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
      populate: { path: 'master_event_id' },
    },
  ]);

  // I am unsure why, but as of 2/26/2020 at least, this query doesn't work if included with the populate statements above
  docPlaylist = await db.Library.populate(docPlaylist, [
    {
      path: 'scratchpad.track.artists',
      model: 'Library',
    },
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
