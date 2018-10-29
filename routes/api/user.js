const router = require('express').Router();
const userController = require('../../controllers/userController');
const passport = require('passport');
const requireLogin = require('../../middlewares/requireLogin');

router.route('/')
  .get(userController.find)
  .post(userController.create)
  .put(userController.update)
  .delete(userController.remove);

// Filter routes
router.route('/filter/active')
  .get(userController.findActive);

router.route('/filter/inactive')
  .get(userController.findInactive);

// Search routes
router.route('/search/:name')
  .get(userController.search);

// Permission Updates
router.route('/permission/:id')
  .put(userController.updatePermission);

module.exports = router;
