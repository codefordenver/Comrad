const router = require('express').Router();
const { shows } = require('../../controllers/v1');

router
  .route('/')
  .get(shows.findAll)
  .post(shows.create);

router.route('/date').get(shows.findByDate);

router
  .route('/:id')
  .get(shows.findById)
  .delete(shows.remove)
  .put(shows.update);

module.exports = router;
