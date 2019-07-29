const router = require('express').Router();

const accessControl = require('./accessControl');
const albums = require('./albums');
const announcements = require('./announcements');
const artists = require('./artists');
const auth = require('./auth');
const config = require('./config');
const events = require('./events');
const library = require('./library');
const playlists = require('./playlists');
const resources = require('./resources');
const tracks = require('./tracks');
const users = require('./users');

router.use('/access-control', accessControl);
router.use('/albums', albums);
router.use('/announcements', announcements);
router.use('/artists', artists);
router.use('/auth', auth);
router.use('/config', config);
router.use('/events', events);
router.use('/library', library);
router.use('/playlists', playlists);
router.use('/resources', resources);
router.use('/tracks', tracks);
router.use('/users', users);

module.exports = router;
