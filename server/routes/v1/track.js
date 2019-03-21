const router = require('express').Router();
const { track } = require('../../controllers/v1');

router
  .route('/')
  .get(track.findAll)
  .post(track.create);

router.route('/search').get(track.search);

router.route('/many').post(track.createMany);

router
  .route('/:id')
  .get(track.findById)
  .put(track.update)
  .delete(track.remove);

module.exports = router;
