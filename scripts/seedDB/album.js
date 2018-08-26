require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../../models');
const keys = require('../../config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const seeds = [
  {
    album: {
      title: 'Escape',
      artist: 'Journey',
      label: 'Columbia',
      local: false,
      compilation: '',
      location: '',
      album_art: ''
    },
    tracks: [
      {
        title: 'Don\'t Stop Believin',
        track_number: '1',
        disk_number: '1',
        duration: '4:11',
        artist: 'Journey'
      },
      {
        title: 'Stone in Love',
        track_number: '2',
        disk_number: '1',
        duration: '4:26',
        artist: 'Journey'
      },
      {
        title: 'Who\'s Crying Now',
        track_number: '3',
        disk_number: '1',
        duration: '5:01',
        artist: 'Journey'
      },
      {
        title: 'Keep On Runnin',
        track_number: '4',
        disk_number: '1',
        duration: '3:40',
        artist: 'Journey'
      },
      {
        title: 'Still They Ride',
        track_number: '5',
        disk_number: '1',
        duration: '3:50',
        artist: 'Journey'
      },
      {
        title: 'Escape',
        track_number: '6',
        disk_number: '2',
        duration: '5:17',
        artist: 'Journey'
      },
      {
        title: 'Lay It Down',
        track_number: '7',
        disk_number: '2',
        duration: '4:13',
        artist: 'Journey'
      },
      {
        title: 'Dead or Alive',
        track_number: '8',
        disk_number: '2',
        duration: '3:21',
        artist: 'Journey'
      },
      {
        title: 'Mother, Father',
        track_number: '9',
        disk_number: '2',
        duration: '5:29',
        artist: 'Journey'
      },
      {
        title: 'Open Arms',
        track_number: '10',
        disk_number: '2',
        duration: '3:23',
        artist: 'Journey'
      }
    ]
  },
  {
    album: {
      title: 'Thriller',
      artist: 'Michael Jackson',
      label: 'Epic',
      local: false,
      compilation: '',
      location: '',
      album_art: ''
    },
    tracks: [
      {
        title: 'Wanna Be Startin\' Something',
        track_number: '1',
        disk_number: '1',
        duration: '6:02',
        artist: 'Michael Jackson'
      },
      {
        title: 'Baby Be Mine',
        track_number: '2',
        disk_number: '1',
        duration: '4:20',
        artist: 'Michael Jackson'
      },
      {
        title: 'The Girl Is Mine',
        track_number: '3',
        disk_number: '1',
        duration: '3:41',
        artist: 'Michael Jackson'
      },
      {
        title: 'Thriller',
        track_number: '4',
        disk_number: '1',
        duration: '5:57',
        artist: 'Michael Jackson'
      },
      {
        title: 'Beat It',
        track_number: '5',
        disk_number: '1',
        duration: '4:18',
        artist: 'Michael Jackson'
      },
      {
        title: 'Billie Jean',
        track_number: '6',
        disk_number: '2',
        duration: '4:54',
        artist: 'Michael Jackson'
      },
      {
        title: 'Human Nature',
        track_number: '7',
        disk_number: '2',
        duration: '4:07',
        artist: 'Michael Jackson'
      },
      {
        title: 'P.Y.T. (Pretty Young Thing)',
        track_number: '8',
        disk_number: '2',
        duration: '3:58',
        artist: 'Michael Jackson'
      },
      {
        title: 'The Lady In My Life',
        track_number: '9',
        disk_number: '2',
        duration: '4:59',
        artist: 'Michael Jackson'
      }
    ]
  }
]

db.Album
  .remove({})
  .catch(err => res.json(err));

db.Track
  .remove({})
  .catch(err => res.json(err));

seeds.map(seed => {
  const { album, tracks } = seed;

  db.Album
    .create(album)
    .then(dbAlbum => {

      const trackPromise = tracks.map(track => {

        track['album_id'] = dbAlbum._id;

        return db.Track
          .create(track)
          .then(dbTrack => {
            dbAlbum.tracks.push(dbTrack._id)
          })
          .catch(err => res.status(422).json(err));
      });

      Promise.all(trackPromise).then(() => {
        dbAlbum
          .save()
          .then(dbAlbum => {
            console.log(dbAlbum);
          })
          .catch(err => res.status(422).json(err));
      });
    });
});