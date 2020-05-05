const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keys = require('../config/keys');

//
// The model for artists, albums and tracks is combined into one entity so
// we can run a full-text search across the entire model
//

const librarySchema = new Schema(
  {
    // properties used by artists, albums and tracks

    name: {
      type: String,
    },

    type: {
      type: String,
      enum: ['artist', 'album', 'track'],
    },

    popularity: {
      // ranges from 0-100, with 100 being most popular
      type: Number,
      default: 0,
    },

    custom: Schema.Types.Mixed, // this will be an object that can contain any number of custom properties

    created_at: {
      type: Date,
      default: Date.now,
    },

    updated_at: {
      type: Date,
      default: Date.now,
    },

    // properties used by albums
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Library',
    },

    label: {
      type: String,
    },

    genre: {
      type: Schema.Types.ObjectId,
      ref: 'Genre',
    },

    compilation: {
      type: Boolean,
    },

    // properties used by tracks

    album: {
      type: Schema.Types.ObjectId,
      ref: 'Library',
    },

    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Library',
      },
    ],

    name: {
      type: String,
    },

    track_number: {
      type: Number,
    },

    disk_number: {
      type: Number,
    },

    duration_in_seconds: {
      type: Number,
    },
  },
  { collection: 'library' },
);

// check if any additional keys should be included in the text index
let textIndex = { name: 'text' };
if ('album' in keys.modelCustomFields) {
  let fieldsForCustomIndex = keys.modelCustomFields.album.filter(
    a => a.includeInTextIndex,
  );
  fieldsForCustomIndex.forEach(a => {
    textIndex['custom.' + a.name] = 'text';
  });
}

librarySchema
  .index({ type: 1, updated_at: -1 }, { background: true })
  .index(textIndex, { background: true })
  .index({ artist: 1 }, { background: true })
  .index({ artists: 1 }, { background: true })
  .index({ album: 1, disk_number: 1, track_number: 1 }, { background: true })
  .index({ updated_at: -1 }, { background: true });

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;
