const accessControlController = require('./accessControl');
const albumsController = require('./albums');
const announcementsController = require('./announcements');
const artistsController = require('./artists');
const authController = require('./auth');
const libraryController = require('./library');
const resourcesController = require('./resources');
const showsController = require('./shows');
const tracksController = require('./tracks');
const trafficController = require('./traffic');
const usersController = require('./users');

module.exports = {
  accessControlController,
  albumsController,
  announcementsController,
  artistsController,
  authController,
  libraryController,
  resourcesController,
  showsController,
  tracksController,
  trafficController,
  usersController,
};
