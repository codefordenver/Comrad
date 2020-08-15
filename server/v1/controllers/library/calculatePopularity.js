const db = require('../../models');

async function calculatePopularity() {
  console.log('Calculating popularity');

  console.log('calculating plays for each album based on its tracks...');
  let albumPlays = await db.Playlist.aggregate([
    { $unwind: { path: '$saved_items' } },
    { $match: { 'saved_items.track': { $exists: true } } },
    {
      $lookup: {
        from: 'library',
        localField: 'saved_items.track',
        foreignField: '_id',
        as: 'track_doc',
      },
    },
    { $unwind: { path: '$track_doc' } },
    { $match: { 'track_doc.album': { $exists: true } } },
    { $group: { _id: '$track_doc.album', totalPlays: { $sum: 1 } } },
    { $sort: { totalPlays: -1 } },
  ]);
  let maximumPlays = Math.log(albumPlays[0].totalPlays); //use logarithmic scale since differences in listens can be huge
  let bulkOperations = [];
  albumPlays.forEach(function(plays) {
    bulkOperations.push({
      updateOne: {
        filter: { _id: plays._id },
        update: {
          popularity: Math.ceil(
            (Math.log(plays.totalPlays) / maximumPlays) * 100,
          ),
        },
      },
    });
  });
  await db.Library.bulkWrite(bulkOperations);

  console.log('calculating plays for each artist based on their tracks...');
  let artistPopularity = {};
  let artistPlays = await db.Playlist.aggregate([
    { $unwind: { path: '$saved_items' } },
    { $match: { 'saved_items.track': { $exists: true } } },
    {
      $lookup: {
        from: 'library',
        localField: 'saved_items.track',
        foreignField: '_id',
        as: 'track_doc',
      },
    },
    { $unwind: { path: '$track_doc' } },
    { $unwind: { path: '$track_doc.artists' } },
    { $match: { 'track_doc.artists': { $exists: true } } },
    { $group: { _id: '$track_doc.artists', totalPlays: { $sum: 1 } } },
    { $sort: { totalPlays: -1 } },
  ]);
  maximumPlays = Math.log(artistPlays[0].totalPlays); //use logarithmic scale since differences in listens can be huge
  bulkOperations = [];
  artistPlays.forEach(function(plays) {
    artistPopularity[plays._id] = Math.ceil(
      (Math.log(plays.totalPlays) / maximumPlays) * 100,
    );
    bulkOperations.push({
      updateOne: {
        filter: { _id: plays._id },
        update: { popularity: artistPopularity[plays._id] },
      },
    });
  });
  await db.Library.bulkWrite(bulkOperations);

  //get the number of playlist plays for each track
  console.log('calculating plays for each track...');
  let trackLoops = 0;
  maximumPlays = null;
  bulkOperations = [];
  // process the playlists in groups to prevent Mongo timeouts with large data sets
  while (true) {
    let trackPlays = await db.Playlist.aggregate([
      { $unwind: { path: '$saved_items' } },
      { $match: { 'saved_items.track': { $exists: true } } },
      { $sort: { 'saved_items.track': 1 } },
      { $group: { _id: '$saved_items.track', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $skip: trackLoops * 1000 },
      { $limit: 1000 },
      {
        $lookup: {
          from: 'library',
          localField: '_id',
          foreignField: '_id',
          as: 'track_doc',
        },
      },
      { $unwind: { path: '$track_doc' } },
    ]).allowDiskUse(true);

    console.log(
      'finished getting 1000 tracks for track popularity query (loops: ' +
        String(trackLoops) +
        ')',
    );
    trackLoops = trackLoops + 1;
    if (trackPlays.length === 0) {
      break;
    }
    if (maximumPlays === null) {
      maximumPlays = Math.log(trackPlays[0].count); //use logarithmic scale since differences in listens can be huge
    }
    console.log('processing ' + trackPlays.length + ' tracks');
    trackPlays.forEach(function(plays) {
      // a portion of the popularity will come from the artist, the other part will come from track plays
      let popularity = Math.ceil((Math.log(plays.count) / maximumPlays) * 50);
      //add the average popularity of the artists on the track
      let artistOnTrackPopularity = [];
      for (let i = 0; i < plays.track_doc.artists.length; i++) {
        let artistId = plays.track_doc.artists[i];
        if (artistId in artistPopularity) {
          artistOnTrackPopularity.push(artistPopularity[artistId]);
        }
      }
      if (artistOnTrackPopularity.length > 0) {
        let sum = artistOnTrackPopularity.reduce((a, b) => a + b, 0);
        popularity += Math.ceil(sum / artistOnTrackPopularity.length / 2);
      }
      bulkOperations.push({
        updateOne: {
          filter: { _id: plays._id },
          update: { popularity: popularity },
        },
      });
    });
  }
  await db.Library.bulkWrite(bulkOperations);
}

module.exports = calculatePopularity;
