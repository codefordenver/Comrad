const router = require('express').Router();
const { usersController } = require('../controllers');
const { requireAC, requireAdmin, requireLogin } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Users', 'readOwn'), usersController.findAll)
  .post(requireAC('Users', 'createOwn'), usersController.create);

router
  .route('/random')
  .post(requireAC('Users', 'createOwn'), usersController.randomUser);
router
  .route('/search')
  .get(requireAC('Users', 'readOwn'), usersController.search);
router.route('/search-hosts').get(usersController.searchHosts);

router
  .route('/:id')
  .get(usersController.findById)
  .put(usersController.update)
  .delete(requireLogin, requireAdmin, usersController.remove);

router.route('/:id/permission').put(usersController.updatePermission);

module.exports = router;
