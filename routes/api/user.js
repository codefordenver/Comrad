const router = require('express').Router();
const userController = require('../../controllers/userController');
const passport = require('passport');
const requireLogin = require('../../middlewares/requireLogin');

// Page items with 100 results per page

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
router.route('/filter/active:sort_by')
  .get(userController.findActive);

router.route('/filter/inactive:sort_by')
  .get(userController.findInactive);

router.route('/filter/active:sort_by')
  .get(userController.findActive);

// Search routes
router.route('/search/for/:name')
  .get(userController.search);

// Permission Updates
router.route('/permission/:id')
  .put(userController.updatePermission);

module.exports = router;
