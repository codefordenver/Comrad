const router = require('express').Router();
const { resourcesController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('resources', 'readOwn'), resourcesController.findAll)
  .post(resourcesController.create);

router.route('/search').get(resourcesController.search);

router
  .route('/:id')
  .put(resourcesController.update)
  .delete(resourcesController.remove);

module.exports = router;
