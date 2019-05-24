const router = require('express').Router();
const { showsController } = require('../controllers');

router
  .route('/')
  .get(showsController.find)
  .post(showsController.create);

router
  .route('/:id')
  .get(showsController.findById)
  .delete(showsController.remove)
  .put(showsController.createInstance)
  .patch(showsController.update);

module.exports = router;
