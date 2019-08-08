const accessControlController = require('./accessControl');
const announcementsController = require('./announcements');
const authController = require('./auth');
const configController = require('./config');
const genresController = require('./genres');
const libraryController = require('./library');
const playlistsController = require('./playlists');
const resourcesController = require('./resources');
const showRootController = require('./shows/root');
const showInstanceController = require('./shows/instance');
const showSeriesController = require('./shows/series');
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
  showRootController,
  showInstanceController,
  showSeriesController,
  usersController,
};
