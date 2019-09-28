const router = require('express').Router();
const { requireAC } = require('../middlewares');
const {
  eventRootController,
  eventInstanceController,
  eventSeriesController,
} = require('../controllers');

// :type is either "shows" or "traffic"
router
  .route('/:eventType/')
  .get(requireAC(null, 'readAny'), eventRootController.find)
  .post(requireAC(null, 'createAny'), eventRootController.create);

router
  .route('/:eventType/:id')
  .get(requireAC(null, 'readAny'), eventRootController.findById)
  .delete(requireAC(null, 'deleteAny'), eventRootController.remove)
  .put(requireAC(null, 'updateOwn'), eventRootController.createInstance) // TODO: updateOwn restriction
  .patch(requireAC(null, 'updateOwn'), eventRootController.update); // TODO: updateOwn restriction

router
  .route('/:eventType/instance/:id')
  .delete(requireAC(null, 'deleteAny'), eventInstanceController.remove);

router
  .route('/:eventType/series/:id')
  .delete(requireAC(null, 'deleteAny'), eventSeriesController.remove)
  .patch(requireAC(null, 'updateOwn'), eventSeriesController.update); // TODO: updateOwn restriction

module.exports = router;
