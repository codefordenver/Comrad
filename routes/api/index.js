const router = require('express').Router();

const albumRoutes = require('./album');
const trackRoutes = require('./track');
const userRoutes = require('./user');

router.use('/album', albumRoutes);
router.use('/track', trackRoutes);
router.use('/user', userRoutes);

module.exports = router;