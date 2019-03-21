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

router.use('/album', album);
router.use('/announcement', announcement);
router.use('/artist', artist);
router.use('/auth', auth);
router.use('/feature', feature);
router.use('/giveaway', giveaway);
router.use('/library', library);
router.use('/show', show);
router.use('/track', track);
router.use('/traffic', traffic);
router.use('/user', user);
router.use('/venue', venue);

module.exports = router;
