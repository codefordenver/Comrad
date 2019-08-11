const router = require('express').Router();
const { requireAC } = require('../middlewares');
const {
  showRootController,
  showInstanceController,
  showSeriesController,
} = require('../controllers');

// :type is either "shows" or "traffic"
router
  .route('/:eventType/')
  .get(requireAC(null, 'readAny'), showRootController.find)
  .post(requireAC(null, 'createAny'), showRootController.create);

router
  .route('/:eventType/:id')
  .get(requireAC(null, 'readAny'), showRootController.findById)
  .delete(requireAC(null, 'deleteAny'), showRootController.remove)
  .put(requireAC(null, 'updateAny'), showRootController.createInstance)
  .patch(requireAC(null, 'updateAny'), showRootController.update);

router
  .route('/:eventType/instance/:id')
  .delete(requireAC(null, 'deleteAny'), showInstanceController.remove);

router
  .route('/:eventType/series/:id')
  .delete(requireAC(null, 'deleteAny'), showSeriesController.remove)
  .patch(requireAC(null, 'updateAny'), showSeriesController.update);

module.exports = router;
