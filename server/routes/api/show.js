const router = require('express').Router();
const showController = require('../../controllers/showController');

router
  .route('/')
  .get(showController.EXAMPLE)
  .post(showController.create);

//  .get(showController.findAll)

router
  .route('/:id')
  .get(showController.findById)
  .put(showController.update)
  .delete(showController.remove);

module.exports = router;
