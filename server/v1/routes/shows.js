const router = require('express').Router();
const {
  showRootController,
  showInstanceController,
  showSeriesController,
} = require('../controllers');

router
  .route('/')
  .get(showRootController.find)
  .post(showRootController.create);

router
  .route('/:id')
  .get(showRootController.findById)
  .delete(showRootController.remove)
  .put(showRootController.createInstance)
  .patch(showRootController.update);

router.route('/instance/:id').delete(showInstanceController.remove);

router.route('/series/:id').get(showSeriesController.remove);

module.exports = router;
