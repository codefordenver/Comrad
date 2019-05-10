const router = require('express').Router();
const { tracksController } = require('../controllers');

router
  .route('/')
  .get(tracksController.findAll)
  .post(tracksController.create);

router.route('/search').get(tracksController.search);

router.route('/many').post(tracksController.createMany);

router
  .route('/:id')
  .get(tracksController.findById)
  .put(tracksController.update)
  .delete(tracksController.remove);

module.exports = router;
