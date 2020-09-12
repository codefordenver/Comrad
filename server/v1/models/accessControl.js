/**
 * @swagger
 *
 * components:
 *   schemas:
 *     AccessControl:
 *       type: object
 *       required: [role,resource,action,attributes]
 *       properties:
 *         role:
 *           type: string
 *           description: The role name (Admin, DJ, etc.) to grant permissions to
 *         resource:
 *           type: string
 *           description: The resource (Library, Playlists, etc.) to grant permissions to
 *         action:
 *           type: string
 *           description: "The actions that can be performed on the resource. Possible values: read:own, read:any, update:own, update:any"
 *         attributes:
 *           type: string
 *           description: The attributes that can be modified by the role. Can be *, or a comma-delimited list of attributes
 *       example:
 *         role: "Admin"
 *         resource: "TestResource"
 *         action: "create:any"
 *         attributes: "*"
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
