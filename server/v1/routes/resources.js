const router = require('express').Router();
const { resourcesController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Resources', 'readAny'), resourcesController.findAll)
  .post(requireAC('Resources', 'createAny'), resourcesController.create);

router
  .route('/search')
  .get(requireAC('Resources', 'readAny'), resourcesController.search);

router
  .route('/:id')
  .put(requireAC('Resources', 'updateAny'), resourcesController.update)
  .delete(requireAC('Resources', 'deleteAny'), resourcesController.remove);

module.exports = router;
