const router = require('express').Router();
const authController = require('../../controllers/authController');
const passport = require('passport');
const requireLogin = require('../../middlewares/requireLogin');

router.route('/signin')
  .post(passport.authenticate('local'), authController.signin);

router.route('/signout')
  .get(requireLogin, authController.signout);

router.route('/current')
  .get(requireLogin, authController.current);

module.exports = router;