const router = require('express').Router();
const userController = require('../../controllers/userController');
const passport = require('passport');
const requireLogin = require('../../middlewares/requireLogin');

router.route('/')
  .get(userController.find)
  .post(userController.create);

router.route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

// Sort options for find
router.route('/sort/:sort_by')
  .get(userController.find);

// Filter routes
router.route('/filter/active')
  .get(userController.findActive);

router.route('/filter/inactive')
  .get(userController.findInactive);

router.route('/filter/active')
  .get(userController.findActive);

// Permission Updates
router.route('/permission/:id')
  .put(userController.updatePermission);

module.exports = router;
