const router = require('express').Router();
const {
  showRootController,
  showInstanceController,
  showSeriesController,
} = require('../controllers');

// :type is either "shows" or "traffic"

router
  .route('/:eventType/')
  .get(showRootController.find)
  .post(showRootController.create);

router
  .route('/:eventType/:id')
  .get(showRootController.findById)
  .delete(showRootController.remove)
  .put(showRootController.createInstance)
  .patch(showRootController.update);

router.route('/:eventType/instance/:id').delete(showInstanceController.remove);

router.route('/:eventType/series/:id').get(showSeriesController.remove);

module.exports = router;
