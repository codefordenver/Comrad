const router = require('express').Router();
const { resourcesController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Resources', 'readOwn'), resourcesController.findAll)
  .post(requireAC('Resources', 'createAny'), resourcesController.create);

router.route('/search').get(resourcesController.search);

router
  .route('/:id')
  .put(resourcesController.update)
  .delete(resourcesController.remove);

module.exports = router;
