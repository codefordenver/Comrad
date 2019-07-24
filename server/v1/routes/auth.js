const router = require('express').Router();
const { authController } = require('../controllers');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const { requireAC } = require('../middlewares');

router
  .route('/login')
  .post(passport.authenticate('local'), authController.login);

router
  .route('/logout')
  .get(requireAC('Auth', 'readAny'), authController.logout);

router
  .route('/current')
  .get(requireAC('Auth', 'readAny'), authController.current);

router
  .route('/password/reset')
  .put(requireAC('Auth', 'updateAny'), authController.passwordReset);

router
  .route('/password/new')
  .put(requireAC('Auth', 'updateAny'), authController.passwordNew);

module.exports = router;
