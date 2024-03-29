/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required: [name]
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the genre
 *       example:
 *         name: "Bluegrass"
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
