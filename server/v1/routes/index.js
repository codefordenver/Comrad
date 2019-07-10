const router = require('express').Router();

const albums = require('./albums');
const announcements = require('./announcements');
const artists = require('./artists');
const auth = require('./auth');
const features = require('./features');
const giveaways = require('./giveaways');
const library = require('./library');
const resources = require('./resources');
const roles = require('./roles');
const shows = require('./shows');
const tracks = require('./tracks');
const traffic = require('./traffic');
const users = require('./users');
const venues = require('./venues');

router.use('/albums', albums);
router.use('/announcements', announcements);
router.use('/artists', artists);
router.use('/auth', auth);
router.use('/features', features);
router.use('/giveaways', giveaways);
router.use('/library', library);
router.use('/resources', resources);
router.use('/roles', roles);
router.use('/shows', shows);
router.use('/tracks', tracks);
router.use('/traffic', traffic);
router.use('/users', users);
router.use('/venues', venues);

module.exports = router;
