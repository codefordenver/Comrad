const router = require('express').Router();
const { resourcesController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Resources', 'readOwn'), resourcesController.findAll)
  .post(requireAC('Resources', 'createOwn'), resourcesController.create);

router
  .route('/search')
  .get(requireAC('Resources', 'readOwn'), resourcesController.search);

router
  .route('/:id')
  .put(requireAC('Resources', 'updateOwn'), resourcesController.update)
  .delete(requireAC('Resources', 'deleteOwn'), resourcesController.remove);

module.exports = router;
