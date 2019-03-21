const router = require('express').Router();
const { feature } = require('../../controllers/v1');

router
  .route('/')
  .get(feature.findAll)
  .post(feature.create);

router
  .route('/:id')
  .get(feature.findById)
  .put(feature.update)
  .delete(feature.remove);

module.exports = router;
