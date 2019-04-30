const router = require('express').Router();
const { features } = require('../../controllers/v1');

router
  .route('/')
  .get(features.findAll)
  .post(features.create);

router
  .route('/:id')
  .get(features.findById)
  .put(features.update)
  .delete(features.remove);

module.exports = router;
