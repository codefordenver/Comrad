const router = require('express').Router();

const albumRoutes = require('./album');
const announcementRoutes = require('./announcement');
const featureRoutes = require('./feature');
const showRoutes = require('./show');
const ticketRoutes = require('./ticket');
const trackRoutes = require('./track');
const userRoutes = require('./user');
const venueRoutes = require('./venue');

router.use('/album', albumRoutes);
router.use('/announcement', announcementRoutes);
router.use('/feature', featureRoutes);
router.use('/show', showRoutes);
router.use('/ticket', ticketRoutes);
router.use('/track', trackRoutes);
router.use('/user', userRoutes);
router.use('/venue', venueRoutes);

module.exports = router;