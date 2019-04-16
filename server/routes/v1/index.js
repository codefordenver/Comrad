const router = require('express').Router();

const album = require('./album');
const announcement = require('./announcement');
const artist = require('./artist');
const auth = require('./auth');
const feature = require('./feature');
const giveaway = require('./giveaway');
const library = require('./library');
const show = require('./show');
const track = require('./track');
const traffic = require('./traffic');
const user = require('./user');
const venue = require('./venue');

router.use('/albums', album);
router.use('/announcements', announcement);
router.use('/artists', artist);
router.use('/auths', auth);
router.use('/features', feature);
router.use('/giveaways', giveaway);
router.use('/library', library);
router.use('/shows', show);
router.use('/tracks', track);
router.use('/traffics', traffic);
router.use('/users', user);
router.use('/venues', venue);

module.exports = router;
