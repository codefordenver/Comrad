const accessControlController = require('./accessControl');
const announcementsController = require('./announcements');
const authController = require('./auth');
const configController = require('./config');
const genresController = require('./genres');
const libraryController = require('./library');
const playlistsController = require('./playlists');
const resourcesController = require('./resources');
const eventRootController = require('./events/root');
const eventInstanceController = require('./events/instance');
const eventSeriesController = require('./events/series');
const usersController = require('./users');

module.exports = {
  accessControlController,
  announcementsController,
  authController,
  configController,
  genresController,
  libraryController,
  playlistsController,
  resourcesController,
  eventRootController,
  eventInstanceController,
  eventSeriesController,
  usersController,
};
