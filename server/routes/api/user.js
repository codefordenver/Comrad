const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/').get(userController.findAll);

// Filter routes
router.route('/filter/:status').get(userController.findByActive);

// Search routes
router.route('/search/:name').get(userController.search);

// Permission Updates
router.route('/permission/:id').put(userController.updatePermission);

router
  .route('/:id')
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
