const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  //since playlists can live alone as its own Comrad module,
  //rather than tie the playlist to a show, we will tie it to a
  //start and end time
  start_time_utc: {
    type: Date,
    required: true,
  },
  end_time_utc: {
    type: Date,
    required: true,
  },

  scratchpad: [
    {
      type: {
        type: String,
        enum: ['track', 'comment', 'voice_break'],
      },

      executed_time_utc: {
        // the time the value was moved to Saved Items
        type: Date,
      },

      //items on the scratchpad do not have an associated time,
      //but on the front-end they can be positioned relative to
      //traffic events, which do have an associated time.
      //so, here we capture the range where a traffic event should
      //appear. These fields are optional, and if they are not set,
      //the traffic events will appear relative to the other events in the array,
      //and will appear after all traffic events if nothing in the scratchpad
      //has associated times
      occurs_after_time_utc: {
        type: Date,
      },
      occurs_before_time_utc: {
        type: Date,
      },

      //for "track" type
      track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
      },

      //for "comment" type
      description: {
        type: String,
      },

      //no additional fields for "voice_break" type
    },
  ],

  saved_items: [
    {
      type: {
        type: String,
        enum: ['track', 'comment', 'voice_break', 'traffic'],
      },

      //items on the scratchpad do not have an associated time,
      //but on the front-end they can be positioned relative to
      //traffic events, which do have an associated time.
      //so, here we capture the range where a traffic event should
      //appear. These fields are optional, and if they are not set,
      //the traffic events will appear relative to the other events in the array,
      //and will appear after all traffic events if nothing in the scratchpad
      //has associated times
      occurs_after_time_utc: {
        type: Date,
      },
      occurs_before_time_utc: {
        type: Date,
      },

      //for "track" type
      track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
      },

      //for "comment" type
      description: {
        type: String,
      },

      //no additional fields for "voice_break" type

      //for "traffic" type
      traffic: {
        type: Schema.Types.ObjectId,
        ref: 'Traffic',
      },
    },
  ],

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

playlistSchema.index({ start_time_utc: 1 }, { background: true });

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
