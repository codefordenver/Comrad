const router = require('express').Router();
const venueController = require('../../controllers/venueController');

router
  .route('/')
  .get(venueController.findAll)
  .post(venueController.create);

router
  .route('/:id')
  .get(venueController.findById)
  .put(venueController.update)
  .delete(venueController.remove);

module.exports = router;
