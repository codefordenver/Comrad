const router = require('express').Router();
const { permissionsController } = require('../controllers');

router
  .route('/')
  .get(permissionsController.findAll)
  .post(permissionsController.create);

router
  .route('/:id')
  .get(permissionsController.findById)
  .put(permissionsController.update)
  .delete(permissionsController.remove);

module.exports = router;
