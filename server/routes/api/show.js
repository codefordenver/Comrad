const router = require('express').Router();
const showHost = require('./showHost');
const showController = require('../../controllers/showController');

router
  .route('/')
  .get(showController.findByDate)
  .post(showController.create);

router
  .route('/:id')
  .get(showController.findById)
  .patch(showController.update)
  .delete(showController.remove);

router.use('/:id/host', showHost);

module.exports = router;
