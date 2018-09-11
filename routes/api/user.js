const router = require('express').Router();
const userController = require('../../controllers/userController');
const passportServices = require('../../services/passport');
const passport = require('passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireToken = passport.authenticate('jwt', { session: false });

router.route('/')
  .get(requireToken, userController.findAll);

router.route('/signup')
  .post(userController.signup);

router.route('/signin')
  .post(requireSignin, userController.signin);

router.route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;