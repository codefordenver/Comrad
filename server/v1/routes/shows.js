const router = require('express').Router();
const { showsController } = require('../controllers');
const { requireAC } = require('../middlewares');

router
  .route('/')
  .get(requireAC('Shows', 'readAny'), showsController.find)
  .post(showsController.create);

router
  .route('/:id')
  .get(requireAC('Shows', 'readAny'), showsController.findById)
  .delete(requireAC('Shows', 'deleteAny'), showsController.remove)
  .put(requireAC('Shows', 'updateAny'), showsController.createInstance)
  .patch(requireAC('Shows', 'updateAny'), showsController.update);

module.exports = router;
