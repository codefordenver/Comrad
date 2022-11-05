const db = require('../../../models');
const axios = require('axios');

async function findItunesByCollectionId(collectionId) {
  let itunesResponse = await axios.get('http://itunes.apple.com/lookup?id=' + encodeURIComponent(collectionId) + '&entity=song&limit=500');

  var data = itunesResponse.data;

  var album = null;
  var tracks = [];


  data.results.forEach(d => {
    if (album == null && d['wrapperType'] == 'collection') {
      album = {
        'id': d['collectionId'],
        'title': d['collectionName'],
        'artist': d['artistName'],
        'albumArt': d['artworkUrl100'],
        'genre': d['primaryGenreName'],
        'trackCount': d['trackCount'],
        'copyright': d['copyright'],
        'compilation': d['collectionType'] == 'Compilation' || d['artistName'] == 'Various Artists'
      };
    } else if (d['wrapperType'] == 'track') {
      tracks.push({
        'name': d['trackName'],
        'artistName': d['artistName'],
        'previewUrl': d['previewUrl'],
        'diskNumber': d['discNumber'],
        'trackNumber': d['trackNumber'],
        'duration': Math.ceil(d['trackTimeMillis'] / 1000)
      });
    }
  });

  if (!album) {
    console.log('album not found in itunes');
    return res.json(null);
  }

  // check if album has already been imported
  let localAlbum = await db.Library.findOne({
    'type': 'album',
    $or: [
      {'itunes_id': collectionId},
      {'name': new RegExp(album['title'], "i")}
    ]
  }).populate('artist');

  if (!localAlbum['itunes_id'] && localAlbum['artist']['name'].toLowerCase() != album['artist'].toLowerCase()) {
    localAlbum = null;
  }

  if (localAlbum) {
    localAlbum = { ...localAlbum._doc };
    const dbTracks = await db.Library.find({ album: localAlbum._id });
    localAlbum.tracks = dbTracks;
  }
  
  return {
    localAlbum,
    album,
    tracks
  };
}
module.exports = findItunesByCollectionId;
