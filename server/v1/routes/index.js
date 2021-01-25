const router = require('express').Router();

const accessControl = require('./accessControl');
const auth = require('./auth');
const config = require('./config');
const genres = require('./genres');
const hostGroups = require('./hostGroups');
const events = require('./events');
const library = require('./library');
const playlists = require('./playlists');
const reporting = require('./reporting');
const resources = require('./resources');
const users = require('./users');

const { requireAC } = require('../middlewares');

const { eventsController, playlistsController } = require('../controllers');

router.use('/access-control', accessControl);
router.use('/auth', auth);
router.use('/config', config);
router.use('/genres', genres);
router.use('/host-groups', hostGroups);
router.use('/events', events);
router.use('/library', library);
router.use('/playlists', playlists);
router.use('/reporting', reporting);
router.use('/resources', resources);
router.use('/users', users);

// simplified endpoints to make the API more accessible to integrations
router
  .route('/current-show')
  .get(requireAC('Shows', 'readAny'), eventsController.currentShow);

router
  .route('/next-show')
  .get(requireAC('Shows', 'readAny'), eventsController.nextShow);

router
  .route('/previous-show')
  .get(requireAC('Shows', 'readAny'), eventsController.previousShow);

router
  .route('/recent-shows')
  .get(requireAC('Shows', 'readAny'), eventsController.recentShows);

router
  .route('/recent-plays')
  .get(requireAC('Playlists', 'readAny'), playlistsController.recentPlays);

module.exports = router;
