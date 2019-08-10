const router = require('express').Router();
const { requireAC } = require('../middlewares');
const {
  showRootController,
  showInstanceController,
  showSeriesController,
} = require('../controllers');

// :type is either "shows" or "traffic"
const getEventAccess = (req, access) => {
  const { eventType } = req.params;
  return requireAC(eventType, access);
};
router
  .route('/:eventType/')
  .get(req => getEventAccess(req, 'readAny'), showRootController.find)
  .post(req => getEventAccess(req, 'createAny'), showRootController.create);

router
  .route('/:eventType/:id')
  .get(req => getEventAccess(req, 'readAny'), showRootController.findById)
  .delete(req => getEventAccess(req, 'deleteAny'), showRootController.remove)
  .put(
    req => getEventAccess(req, 'updateAny'),
    showRootController.createInstance,
  )
  .patch(req => getEventAccess(req, 'updateAny'), showRootController.update);

router
  .route('/:eventType/instance/:id')
  .delete(
    req => getEventAccess(req, 'deleteAny'),
    showInstanceController.remove,
  );

router
  .route('/:eventType/series/:id')
  .delete(req => getEventAccess(req, 'deleteAny'), showSeriesController.remove)
  .patch(req => getEventAccess(req, 'updateAny'), showSeriesController.update);

module.exports = router;
