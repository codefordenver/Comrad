const router = require('express').Router();

const announcements = require('./announcements');
const auth = require('./auth');
const config = require('./config');
const events = require('./events');
const features = require('./features');
const giveaways = require('./giveaways');
const library = require('./library');
const permissions = require('./permissions');
const playlists = require('./playlists');
const resources = require('./resources');
const users = require('./users');
const venues = require('./venues');

router.use('/announcements', announcements);
router.use('/auth', auth);
router.use('/config', config);
router.use('/events', events);
router.use('/features', features);
router.use('/giveaways', giveaways);
router.use('/library', library);
router.use('/permissions', permissions);
router.use('/playlists', playlists);
router.use('/resources', resources);
router.use('/users', users);
router.use('/venues', venues);

module.exports = router;
