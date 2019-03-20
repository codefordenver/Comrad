const router = require('express').Router();
const showController = require('../../controllers/showController');

router
  .route('/')
  .get(showController.findByDate)
  .post(showController.create);

router
  .route('/:id')
  .get(showController.findById)
  .patch(showController.updateHost)
  .delete(showController.remove);

module.exports = router;
