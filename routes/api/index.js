const router = require('express').Router();
const passportServices = require('../../services/passport');
const passport = require('passport');

const albumRoutes = require('./album');
const announcementRoutes = require('./announcement');
const authRoutes = require('./auth');
const eventRoutes = require('./event');
const featureRoutes = require('./feature');
const showRoutes = require('./show');
const giveawayRoutes = require('./giveaway');
const trackRoutes = require('./track');
const userRoutes = require('./user');
const venueRoutes = require('./venue');

router.use('/album', albumRoutes);
router.use('/announcement', announcementRoutes);
router.use('/auth', authRoutes);
router.use('/event', eventRoutes);
router.use('/feature', featureRoutes);
router.use('/show', showRoutes);
router.use('/giveaway', giveawayRoutes);
router.use('/track', trackRoutes);
router.use('/user', userRoutes);
router.use('/venue', venueRoutes);

module.exports = router;