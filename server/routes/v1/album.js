const router = require('express').Router();
const { album } = require('../../controllers/v1');

router
  .route('/')
  .get(album.findAll)
  .post(album.create);

router.route('/many').post(album.createMany);
router.route('/search').get(album.search);

router
  .route('/:id')
  .get(album.findById)
  .put(album.update)
  .delete(album.remove);

router.route('/:id/tracks').get(album.findTracks);

module.exports = router;
