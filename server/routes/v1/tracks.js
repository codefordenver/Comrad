const router = require('express').Router();
const { tracks } = require('../../controllers/v1');

router
  .route('/')
  .get(tracks.findAll)
  .post(tracks.create);

router.route('/search').get(tracks.search);

router.route('/many').post(tracks.createMany);

router
  .route('/:id')
  .get(tracks.findById)
  .put(tracks.update)
  .delete(tracks.remove);

module.exports = router;
