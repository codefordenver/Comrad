const router = require('express').Router();
const { shows } = require('../../controllers/v1');

router
  .route('/')
  .get(shows.find)
  .post(shows.create);

router
  .route('/:id')
  .get(shows.findById)
  .delete(shows.remove)
  .put(shows.update);

module.exports = router;
