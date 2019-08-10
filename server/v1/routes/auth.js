const router = require('express').Router();
const { authController } = require('../controllers');
const passport = require('passport');
const { requireAC } = require('../middlewares');

router
  .route('/login')
  .post(passport.authenticate('local'), authController.login);

router.route('/logout').get(authController.logout);

router
  .route('/current')
  .get(requireAC('Auth', 'readAny'), authController.current);

router.route('/password/reset').put(authController.passwordReset);

router.route('/password/new').put(authController.passwordNew);

module.exports = router;
