const accessControlController = require('./accessControl');
const authController = require('./auth');
const configController = require('./config');
const genresController = require('./genres');
const hostGroupsController = require('./hostGroups');
const libraryController = require('./library');
const playlistsController = require('./playlists');
const reportingController = require('./reporting');
const resourcesController = require('./resources');
const eventsController = require('./events');
const usersController = require('./users');

module.exports = {
  accessControlController,
  authController,
  configController,
  genresController,
  hostGroupsController,
  libraryController,
  playlistsController,
  reportingController,
  resourcesController,
  eventsController,
  usersController,
};
