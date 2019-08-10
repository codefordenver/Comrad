const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  copy: {
    type: String,
  },

  title: {
    type: String,
  },

  type: {
    type: String,
  },

  underwriter_name: {
    type: String,
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
