const router = require('express').Router();

const accessControl = require('./accessControl');
const auth = require('./auth');
const config = require('./config');
const genres = require('./genres');
const events = require('./events');
const library = require('./library');
const playlists = require('./playlists');
const reporting = require('./reporting');
const resources = require('./resources');
const users = require('./users');

router.use('/access-control', accessControl);
router.use('/auth', auth);
router.use('/config', config);
router.use('/genres', genres);
router.use('/events', events);
router.use('/library', library);
router.use('/playlists', playlists);
router.use('/reporting', reporting);
router.use('/resources', resources);
router.use('/users', users);

module.exports = router;
