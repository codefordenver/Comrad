const router = require('express').Router();
const { rolesController } = require('../controllers');

router
  .route('/')
  .get(rolesController.findAll)
  .post(rolesController.create);

router
  .route('/:id')
  .get(rolesController.findById)
  .put(rolesController.update)
  .delete(rolesController.remove);

module.exports = router;
