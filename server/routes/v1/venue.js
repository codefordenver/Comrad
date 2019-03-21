const router = require('express').Router();
const { venue } = require('../../controllers/v1');

router
  .route('/')
  .get(venue.findAll)
  .post(venue.create);

router
  .route('/:id')
  .get(venue.findById)
  .put(venue.update)
  .delete(venue.remove);

module.exports = router;
