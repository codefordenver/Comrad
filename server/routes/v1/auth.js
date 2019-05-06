const router = require('express').Router();
const { auth } = require('../../controllers/v1');
const passport = require('passport');
const requireLogin = require('../../middlewares/requireLogin');

router.route('/login').post(passport.authenticate('local'), auth.login);

router.route('/logout').get(requireLogin, auth.logout);

router.route('/current').get(requireLogin, auth.current);

router.route('/password/reset').put(auth.passwordReset);
router.route('/password/new').put(auth.passwordNew);

module.exports = router;
