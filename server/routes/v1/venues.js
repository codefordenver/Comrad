const router = require('express').Router();
const { venues } = require('../../controllers/v1');

router
  .route('/')
  .get(venues.findAll)
  .post(venues.create);

router
  .route('/:id')
  .get(venues.findById)
  .put(venues.update)
  .delete(venues.remove);

module.exports = router;
