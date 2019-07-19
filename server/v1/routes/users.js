const router = require('express').Router();
const { usersController } = require('../controllers');
const { requireAC, requireAdmin, requireLogin } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Users', 'readOwn'), usersController.findAll)
  .post(usersController.create);

router.route('/random').post(usersController.randomUser);
router.route('/search').get(usersController.search);
router.route('/search-hosts').get(usersController.searchHosts);

router
  .route('/:id')
  .get(usersController.findById)
  .put(usersController.update)
  .delete(requireLogin, requireAdmin, usersController.remove);

router.route('/:id/permission').put(usersController.updatePermission);

module.exports = router;
