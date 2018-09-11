const router = require('express').Router();
const passportServices = require('../../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const requireLogin = require('../../middlewares/requireLogin.js');

const albumRoutes = require('./album');
const announcementRoutes = require('./announcement');
const featureRoutes = require('./feature');
const showRoutes = require('./show');
const giveawayRoutes = require('./giveaway');
const trackRoutes = require('./track');
const userRoutes = require('./user');
const venueRoutes = require('./venue');

router.route('/',)
  .get(requireAuth, (req, res) => {
    res.json({ hi: 'there' });
  });

router.use('/album', albumRoutes);
router.use('/announcement', announcementRoutes);
router.use('/feature', featureRoutes);
router.use('/show', showRoutes);
router.use('/giveaway', giveawayRoutes);
router.use('/track', trackRoutes);
router.use('/user', userRoutes);
router.use('/venue', venueRoutes);

router.route('/test-endpoint')
  .get(requireLogin, function(req, res) {
		res.json({'test': 'success'});
	});

module.exports = router;