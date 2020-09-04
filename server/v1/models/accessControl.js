/**
 * @swagger
 *
 * components:
 *   schemas:
 *     AccessControl:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *         resource:
 *           type: string
 *         action:
 *           type: string
 *         attributes:
 *           type: string
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessControlSchema = new Schema({
  role: {
    type: String,
    required: true,
  },

  resource: {
    type: String,
    required: true,
  },

  action: {
    type: String,
    required: true,
  },

  attributes: {
    type: String,
    required: true,
  },
});

const AccessControl = mongoose.model('AccessControl', accessControlSchema);

module.exports = AccessControl;
