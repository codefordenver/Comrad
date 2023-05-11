/**
 * @swagger
 *
 * /now-playing:
 *   get:
 *     tags:
 *     - Simple Endpoints
 *     - Shows
 *     operationId: NowPlaying
 *     summary: Now Playing
 *     description: |
 *       Returns details on the show and track that is currently playing. This is a custom API tailored specifically for the KGNU mobile app.
 *
 *       This API endpoint can be accessed anonymously.
 *     responses:
 *       200:
 *         description: JSON content includes details on the show and track that's currently playing
 *       401:
 *         description: The authentication you provided to access the API is invalid
 *       500:
 *         description: Server error. Check the response for more details.
 */

const {
  utils: { getModelForEventType, eventList },
  utils__mongoose: {
    findEventQueryByDateRange,
    populateShowHost,
    populateMasterEvent,
    populateMasterEventShowDetails,
  },
} = require('./utils');
const { findOrCreatePlaylist } = require('../playlists/utils');
const { compile  } = require('html-to-text');
let convert = compile({wordwrap: null});

function nowPlaying(req, res) {
  const dbModel = getModelForEventType('shows');
  if (!dbModel) {
    res.send(404);
    return;
  }

  let startDate = new Date();
  let endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  let filter = findEventQueryByDateRange(startDate, endDate);

  const processEventResults = dbShow => {
    let showResults = eventList(dbShow, startDate, endDate);
    if (showResults.length > 0) {
      let show = showResults[0];
      return findOrCreatePlaylist(show.start_time_utc, show.end_time_utc)
        .then(p => {
          show.playlist_executed = p.saved_items;
          let sortedTracks = show
            .playlist_executed
            .filter(p => p.type == 'track')
            .sort((a,b) => {
              if (a.executed_time_utc == b.executed_time_utc) {
                return 0;
              } else if (a.executed_time_utc > b.executed_time_utc) {
                return -1;
              }
              return 1;
            });
          let mostRecentPlay = null;
          if (sortedTracks.length > 0) {
            mostRecentPlay = sortedTracks[0];
          }
          if (mostRecentPlay != null) {

            var now = new Date(); // current date/time

            var difference = now.getTime() - mostRecentPlay.executed_time_utc.getTime(); // difference in milliseconds
            var minutes = difference / (1000 * 60); // convert milliseconds to minutes
            if (minutes > 15) {
              mostRecentPlay = null;
            }
          }
          return res.json({
            "current_show": show.show_details.title,
            "description": convert(show.show_details.description).replace(/\n/g, " "),
            "category": show.show_details.custom?.category ?? "",
            "host": show.show_details.host ? (show.show_details.host.on_air_name ?? show.show_details.host.first_name + " " + show.show_details.host.last_name) : "",
            "host_id": show.show_details.host?._id ?? null,
            "show_id": show.show_details.custom?.numeric_id ?? null,
            "artist": mostRecentPlay ? mostRecentPlay.track.artists.map(a => a.name).join(', ') : null,
            "album": mostRecentPlay ? mostRecentPlay.track.album.name : null,
            "title": mostRecentPlay ? mostRecentPlay.track.name : null,
          });
        })
        .catch(err => {
          console.log(
            'error in events > root > nowPlaying > findOne for playlist',
          );
          console.error(err);
          return res.status(500).json(err);
        });

      

    } else {
      return res.json(null);
    }
  };

  return dbModel
    .find(filter)
    .populate(populateShowHost())
    .populate(populateMasterEvent())
    .populate(populateMasterEventShowDetails())
    .then(processEventResults)
    .catch(err => {
      console.log('error in events > root > currentShow');
      console.error(err);
      return res.status(500).json(err);
    });
}

module.exports = nowPlaying;
