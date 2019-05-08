const router = require('express').Router();
const { usersController } = require('../controllers');

router
  .route('/')
  .get(usersController.findAll)
  .post(usersController.create);

router.route('/random').post(usersController.randomUser);
router.route('/search').get(usersController.search);
router.route('/search-hosts').get(usersController.searchHosts);

router
  .route('/:id')
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

router.route('/:id/permission').put(usersController.updatePermission);

module.exports = router;
