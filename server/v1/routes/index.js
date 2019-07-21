const router = require('express').Router();

const albums = require('./albums');
const announcements = require('./announcements');
const artists = require('./artists');
const auth = require('./auth');
const config = require('./config');
const features = require('./features');
const genres = require('./genres');
const giveaways = require('./giveaways');
const library = require('./library');
const permissions = require('./permissions');
const resources = require('./resources');
const shows = require('./shows');
const tracks = require('./tracks');
const traffic = require('./traffic');
const users = require('./users');
const venues = require('./venues');

router.use('/albums', albums);
router.use('/announcements', announcements);
router.use('/artists', artists);
router.use('/auth', auth);
router.use('/config', config);
router.use('/features', features);
router.use('/genres', genres);
router.use('/giveaways', giveaways);
router.use('/library', library);
router.use('/permissions', permissions);
router.use('/resources', resources);
router.use('/shows', shows);
router.use('/tracks', tracks);
router.use('/traffic', traffic);
router.use('/users', users);
router.use('/venues', venues);

module.exports = router;
