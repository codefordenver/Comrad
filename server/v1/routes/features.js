const router = require('express').Router();
const { featuresController } = require('../controllers');

router
  .route('/')
  .get(featuresController.findAll)
  .post(featuresController.create);

router
  .route('/:id')
  .get(featuresController.findById)
  .put(featuresController.update)
  .delete(featuresController.remove);

module.exports = router;
