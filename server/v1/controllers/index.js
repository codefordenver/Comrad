const announcementsController = require('./announcements');
const authController = require('./auth');
const configController = require('./config');
const featuresController = require('./features');
const giveawaysController = require('./giveaways');
const libraryController = require('./library');
const permissionsController = require('./permissions');
const playlistsController = require('./playlists');
const resourcesController = require('./resources');
const showRootController = require('./shows/root');
const showInstanceController = require('./shows/instance');
const showSeriesController = require('./shows/series');
const usersController = require('./users');
const venuesController = require('./venues');

module.exports = {
  announcementsController,
  authController,
  configController,
  featuresController,
  giveawaysController,
  libraryController,
  permissionsController,
  playlistsController,
  resourcesController,
  showRootController,
  showInstanceController,
  showSeriesController,
  usersController,
  venuesController,
};
