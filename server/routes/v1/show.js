const router = require('express').Router();
const { show } = require('../../controllers/v1');

router
  .route('/')
  .get(show.findByDate)
  .post(show.create);

router
  .route('/:id')
  .get(show.findById)
  .delete(show.remove)
  .patch(show.update);

module.exports = router;
