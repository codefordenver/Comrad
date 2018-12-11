const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    name: {
        type: String
    },

    location: {
        type: String
    },

    url: {
        type: String
    },

    active: {
        type: Boolean
    }
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;