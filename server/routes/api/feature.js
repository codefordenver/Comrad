const router = require('express').Router();
const featureController = require('../../controllers/featureController');

router
  .route('/')
  .get(featureController.findAll)
  .post(featureController.create);

router
  .route('/:id')
  .get(featureController.findById)
  .put(featureController.update)
  .delete(featureController.remove);

module.exports = router;
