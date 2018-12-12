const router = require('express').Router();
const showController = require('../../controllers/showController');

router
  .route('/')
  .get(showController.findAll)
  .post(showController.create);

router
  .route('/:id')
  .get(showController.findById)
  .put(showController.update)
  .delete(showController.remove);

module.exports = router;
