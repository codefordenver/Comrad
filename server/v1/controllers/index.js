const albumsController = require('./albums');
const announcementsController = require('./announcements');
const artistsController = require('./artists');
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
const tracksController = require('./tracks');
const trafficController = require('./traffic');
const usersController = require('./users');
const venuesController = require('./venues');

module.exports = {
  albumsController,
  announcementsController,
  artistsController,
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
  tracksController,
  trafficController,
  usersController,
  venuesController,
};
