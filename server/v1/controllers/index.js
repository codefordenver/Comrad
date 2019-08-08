const accessControlController = require('./accessControl');
const albumsController = require('./albums');
const announcementsController = require('./announcements');
const artistsController = require('./artists');
const authController = require('./auth');
const configController = require('./config');
const genresController = require('./genres');
const libraryController = require('./library');
const playlistsController = require('./playlists');
const resourcesController = require('./resources');
const showRootController = require('./shows/root');
const showInstanceController = require('./shows/instance');
const showSeriesController = require('./shows/series');
const tracksController = require('./tracks');
const usersController = require('./users');

module.exports = {
  accessControlController,
  albumsController,
  announcementsController,
  artistsController,
  authController,
  configController,
  genresController,
  libraryController,
  playlistsController,
  resourcesController,
  showRootController,
  showInstanceController,
  showSeriesController,
  tracksController,
  usersController,
};
