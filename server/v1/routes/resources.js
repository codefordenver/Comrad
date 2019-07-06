const router = require('express').Router();
const { resourcesController } = require('../controllers');

router
  .route('/')
  .get(resourcesController.findAll)
  .post(resourcesController.create);

router
  .route('/:id')
  .put(resourcesController.update)
  .delete(resourcesController.remove);

module.exports = router;
