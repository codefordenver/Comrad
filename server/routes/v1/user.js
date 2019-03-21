const router = require('express').Router();
const { user } = require('../../controllers/v1');

router
  .route('/')
  .get(user.findAll)
  .post(user.create);

// Filter routes
router.route('/filter/:status').get(user.findByActive);

// Search routes
router.route('/search').get(user.search);

// Permission Updates
router.route('/permission/:id').put(user.updatePermission);

router.route('/email').delete(user.deleteByEmail);

router.route('/random').post(user.randomUser);

router
  .route('/:id')
  .get(user.findById)
  .put(user.update)
  .delete(user.remove);

module.exports = router;
